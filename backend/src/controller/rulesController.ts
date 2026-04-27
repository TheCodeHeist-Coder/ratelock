import { type Request, type Response } from "express"
import { errorResponse } from "../utils/errot.js";
import { prisma } from "../lib/prisma.js";
import { error } from "node:console";


// to get all the rules related to the specific project
export const getAllRulesController = async (req: Request, res: Response) => {
    try {

        const projectId = req.params.projectId;
        const rules = await prisma.rule.findMany({
            where: {
                projectId: projectId as string
            },
            orderBy: { createdAt: 'asc' }
        });

        return res.status(200).json({ rules });

    } catch (error) {
        console.log('Error while fetching rules', error);
        return errorResponse(res, 500, 'Internal server error...')
    }
}


// to create rules
export const createRulesController = async (req: Request, res: Response) => {
    try {

        const projectId = req.params.projectId;

        const {
            name,
            endpoint_pattern = '*',
            limit_count = 100,
            window_seconds = 60,
            tier = 'default',
            algorithm = 'sliding_window',
        } = req.body;


        if (!name.trim()) {
            return errorResponse(res, 400, 'Rule name is required and cannot be empty')
        }

        if (limit_count < 1 || limit_count > 1000000) {
            return errorResponse(res, 400, 'Limit count must be between 1 and 1,000,000');
        }

        if (window_seconds < 1 || window_seconds > 86400) {
            return errorResponse(res, 400, 'Window seconds must be between 1 and 86,400 (24 hours)');
        }



        const rule = await prisma.rule.create({
            data: {
                name,
                endpoint_pattern,
                limit_count,
                window_seconds,
                tier,
                algorithm,
                projectId: projectId as string
            }
        });

        // now invalidate the old-rules so that in the next request the new rules will be fetched from the database and stored in redis cache

        return res.status(201).json({ rule });

    } catch (error) {
        console.log('Error while creating rule', error);
        return errorResponse(res, 500, 'Internal server error...')
    }
}