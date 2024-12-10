'use server';

import { Role, User } from '@prisma/client';
import { db } from 'common/libs/db';
import { ActionResponseType } from 'common/types/action-type';
import bcrypt from 'bcrypt';

type RegisterAccount = {
    username: string;
    password: string;
    role: Role;
};
export const handleRegister = async (
    payload: RegisterAccount
): Promise<ActionResponseType<Pick<User, 'username' | 'role'> | null>> => {
    try {
        const accountExist = await db.user.findUnique({
            where: { username: payload.username },
        });
        if (accountExist) {
            return {
                isOk: false,
                error: 'Account already exist.',
            };
        }

        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const newAccount = await db.user.create({
            data: {
                username: payload.username,
                hashedPassword,
                role: payload.role,
            },
            select: {
                username: true,
                role: true,
            },
        });

        return {
            isOk: true,
            data: newAccount,
            message: 'Create account successfully.',
        };
    } catch {
        return { isOk: false, error: 'Something went wrong.' };
    }
};
