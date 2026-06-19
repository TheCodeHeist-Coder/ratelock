
import { type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { errorResponse } from '../utils/errot.js';
import { randomBytes } from 'node:crypto';
import { getDashboardStates } from '../services/analyticsService.js';


/// to get all projects of a user
export const getProjectsController = async (req: Request, res: Response) => {

    const userId = req.user.id;

    try {

        const projects = await prisma.project.findMany({
            where: {
                userId: userId as string
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                _count: {
                    select: {
                        rules: true,
                        events: true
                    }
                }
            }
        });

        return res.status(200).json({ projects });

    } catch (error) {

        console.error('Error fetching projects:', error);
        return errorResponse(res, 500, 'Failed to fetch projects');

    }




}

// logic to create a new project
export const createUserProjectsController = async (req: Request, res: Response) => {


    try {

        const { name, description } = req.body;

        if (!name.trim()) {
            return errorResponse(res, 400, 'Project name is required');
        }

        const userId = req.user.id;

        const project = await prisma.project.create({
            data: {
                name: name.trim(),
                description: description?.trim() || '',
                apiKey: randomBytes(32).toString('hex'),
                userId: userId as string
            }
        });

        return res.status(201).json({ project });

    } catch (error) {
        console.error('Error while creating project:', error);
        return errorResponse(res, 500, 'Failed to create project');

    }
}


// logic for getting the specific project
export const getTheSpecificProjectController = async (req: Request, res: Response) => {

    try {
        const project = req.project;
        return res.status(200).json({ project });
    } catch (error) {
        console.error('Error while fetching the project:', error);
        return errorResponse(res, 500, 'Failed to fetch the project');
    }

}



// to edit the project
export const EditProjectController = async (req: Request, res: Response) => {

    try {
        const { name, description } = req.body;
        const projectId = req.params.projectId;

        const project = await prisma.project.update({
            where: {
                id: projectId as string
            },
            data: {
                ...(name?.trim() && { name: name.trim() }),
                ...(description?.trim() && { description: description.trim() })
            }
        });

        return res.status(200).json({ project });

    } catch (error) {

        console.error('Error while updating the project:', error);
        return errorResponse(res, 500, 'Failed to update the project');

    }


}



export const deleteProjectController = async (req: Request, res: Response) => {

    try {
        const projectId = req.params.projectId;

        const project = await prisma.project.delete({
            where: {
                id: projectId as string
            }
        })

        // caching required to delete cache related to this project
        return res.status(200).json({ message: 'Project deleted successfully' });

    } catch (error) {
        console.log('Error while deleting the project:', error);
        return errorResponse(res, 500, 'Failed to delete the project');
    }

}


// to rotate or change the api-key
export const rotateApiKeyController = async (req: Request, res: Response) => {
    try {

        const projectId = req.params.projectId;

        const project = await prisma.project.update({
            where: {
                id: projectId as string
            },
            data: {
                apiKey: randomBytes(32).toString('hex')
            }
        });

        // not clear the cache from the old api-key project

        return res.status(200).json({ project });

    } catch (error) {
        console.log('Error while rotating the api-key:', error);
        return errorResponse(res, 500, 'Failed to rotate the api-key');
    }
}



// to get the analytics / stats of a running project
export const getProjectStatesController = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId as string;
        const hours = Math.min(Math.max(parseInt(req.query.hours as string) || 24, 1), 24 * 30);

        const stats = await getDashboardStates(projectId, hours);
        return res.status(200).json({ stats });

    } catch (error) {
        console.log('Error while fetching the project states:', error);
        return errorResponse(res, 500, 'Failed to fetch the project states');
    }
}



// to get the recent events related to the running project
export const getEventsOfRunningProjectController = async (req: Request, res: Response) => {

    try {
        const projectId = req.params.projectId as string;
        const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 100, 1), 500);

        const events = await prisma.event.findMany({
            where: { projectId },
            orderBy: { timestamp: 'desc' },
            take: limit,
        });

        return res.status(200).json({ events });

    } catch (error) {
        console.log('Error while fetching the events of the running project:', error);
        return errorResponse(res, 500, 'Failed to fetch the events of the running project');
    }
}