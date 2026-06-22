import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';

/**
 * Verify a plaintext password against the stored hash for a user.
 * Returns false on any miss (no password supplied, user not found, mismatch).
 * Used to re-authenticate before sensitive actions (reveal key, rotate, delete).
 */
export const verifyUserPassword = async (userId: string, password: unknown): Promise<boolean> => {
    if (!password || typeof password !== 'string') return false;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
    });
    if (!user) return false;

    return bcrypt.compare(password, user.password);
};
