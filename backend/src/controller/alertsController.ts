
import { AlertChannel } from '@prisma/client';
import { type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.js';
import { errorResponse } from '../utils/errot.js';


export const getProjectAlertsController = async (req: Request, res: Response) => {
    try {
        const alerts = await prisma.alert.findMany({
            where: { projectId: req.params.projectId as string },
            orderBy: { createdAt: 'desc' },
        });
        return res.json({ alerts });
    } catch (error) {
        console.log('error while getting alerts', error);
        return errorResponse(res, 500, 'internal server errorr');
    }
}



export const CreateprojectAlertsController = async (req: Request, res: Response) => {
    try {
        const {
            name,
            threshold_percent = 80,
            window_minutes = 5,
            channel = 'email',
            destination,
        } = req.body;

        if (!name?.trim() || !destination?.trim()) {
            return res.status(400).json({ error: 'name and destination are required' });
        }
        if (!Object.values(AlertChannel).includes(channel)) {
            return res.status(400).json({ error: `channel must be one of: ${Object.values(AlertChannel).join(', ')}` });
        }

        const alert = await prisma.alert.create({
            data: {
                projectId: req.params.projectId as string,
                name: name.trim(),
                thresholdPercent: threshold_percent,
                windowMinutes: window_minutes,
                channel,
                destination: destination.trim(),
            },
        });

        return res.status(201).json({ alert });

    } catch (error) {
        console.log('error while creating alerts', error);
        return errorResponse(res, 500, 'internal server errorr');
    }
}



export const updateProjectAlertsController = async (req: Request, res: Response) => {
    const { name, threshold_percent, window_minutes, channel, destination, is_active } = req.body;

    try {
        const alert = await prisma.alert.update({
            where: {
                id: req.params.alertId as string,
                projectId: req.params.projectId as string
            },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(threshold_percent !== undefined && { thresholdPercent: threshold_percent }),
                ...(window_minutes !== undefined && { windowMinutes: window_minutes }),
                ...(channel !== undefined && { channel }),
                ...(destination !== undefined && { destination: destination.trim() }),
                ...(is_active !== undefined && { isActive: is_active }),
            },
        });
        return res.json({ alert });
    } catch (err: any) {
        if (err.code === 'P2025') return res.status(404).json({ error: 'Alert not found' });
        throw err;
    }
}


export const deleteProjectAlertsController = async (req: Request, res: Response) => {
    try {
        await prisma.alert.deleteMany({
            where: {
                id: req.params.alertId as string,
                projectId: req.params.projectId as string
            },
        });
        return res.json({ success: true });
    } catch (error) {
        console.log('error while deleting alerts', error);
        return errorResponse(res, 500, 'internal server errorr');
    }
}