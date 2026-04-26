
import { type NextFunction, type Request, type Response } from "express";
import { errorResponse } from "../utils/errot";
import { prisma } from "../lib/prisma";

export const IsProjectOwner = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectId = req.params.projectId;
        const userId = req.user.id;

        if (!userId) {
            return errorResponse(res, 401, 'Unauthorized');
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId as string,
                userId: userId as string
            }
        })

        if (!project) {
            return errorResponse(res, 403, 'Project not found or you do not have access to this project');
        }

        req.project = project;
        next();
    } catch (error) {
        console.error('Error while checking project ownership:', error);
        return errorResponse(res, 500, 'Internal server error');
    }


}