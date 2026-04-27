import { type Request, type Response } from "express"
import { errorResponse } from "../utils/errot.js";
import { prisma } from "../lib/prisma.js";


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


//