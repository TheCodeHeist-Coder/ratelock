import { type Request, type Response } from "express"
import { prisma } from "../lib/prisma.js"
import bcrypt from 'bcrypt';
import { errorResponse } from "../utils/errot.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

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


        const token = jwt.sign({
            userId: user.id, userEmail: user.email
        }, JWT_SECRET, { expiresIn: '16d' });



        return res.status(201).json({
            token,
            user: {
                userId: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    } catch (err: any) {
        if (err.code === 'P2002') {
            return
        }
        console.error('Register error:', err);
        return errorResponse(res, 500, 'Internal server error');
    }

}





export const userLoginController = async (req: Request, res: Response) => {


    const { email, password } = req.body;

    if (!email || !password) {
        return errorResponse(res, 400, 'email and password are required');
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            return errorResponse(res, 401, 'Invalid Credentials')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return errorResponse(res, 401, 'Invalid credentials');
        }

        const token = jwt.sign({
            userId: user.id, userEmail: user.email
        }, JWT_SECRET, { expiresIn: '16d' });


        return res.json({
            user: {
                username: user.name,
                email: user.email,
            },
            token
        });

    } catch (err) {
        console.error('Login error:', err);
        return errorResponse(res, 500, 'Internal server error');
    }


}