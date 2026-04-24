import { type Request, type Response, type NextFunction } from 'express';
import { errorResponse } from '../utils/errot';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return errorResponse(res, 401, 'Unauthorized');
    }

    try {

        const paylaod = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        if (!paylaod) {
            return errorResponse(res, 401, 'Unauthorized');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: paylaod.userId
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
        });

        if (!user) {
            return errorResponse(res, 401, 'Unauthorized');
        }

        req.user = user;
        next();

    } catch (error) {
        console.log('error while authenticating user', error);
        return errorResponse(res, 401, 'Unauthorized');
    }
}