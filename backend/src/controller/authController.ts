import { type Request, type Response } from "express"
import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt';
import { errorResponse } from "../utils/errot";

export const userRegisterController = async (req: Request, res: Response) => {

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return errorResponse(res, 400, 'email, password, and name are required');
    }
    if (password.length < 6) {
        return errorResponse(res, 400, 'Password must be at least 6 characters');
    }

    try {

        const userAlreadyExisted = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase().trim()
            }
        })

        if (userAlreadyExisted) {
            return errorResponse(res, 409, 'Email already registered');
        };


        const HashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase().trim(),
                password: HashedPassword,
                name: name.trim(),
            },
            select: {
                id: true, email: true, name: true,
                createdAt: true, updatedAt: true,
            },
        });

        return res.status(201).json({ user });
    } catch (err: any) {
        if (err.code === 'P2002') {
            return
        }
        console.error('Register error:', err);
        return errorResponse(res, 500, 'Internal server error');
    }

}