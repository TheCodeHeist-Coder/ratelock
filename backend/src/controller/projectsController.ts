
import { type Request, type Response } from 'express';
import { prisma } from '../lib/prisma';
import { use } from 'react';
import { errorResponse } from '../utils/errot';
import { randomBytes } from 'node:crypto';


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
        
        const {name, description} = req.body;

        if(!name.trim()) {
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
    
} catch (error) {
    
}

}