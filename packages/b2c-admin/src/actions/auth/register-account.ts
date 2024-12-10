'use server';

import { Role, User } from '@prisma/client';
import { db } from 'common/libs/db';
import bcrypt from 'bcrypt';
import { ActionResponseType } from 'common/types/action-type';

type Account = {
    username: string;
    password: string;
    name: string;
    role?: Role;
};
export const handleRegisterAccount = async (
    payload: Account
): Promise<
    ActionResponseType<Pick<User, 'username' | 'name' | 'role'> | null>
> => {
    try {
        const accountExist = await db.user.findUnique({
            where: {
                username: payload.username,
            },
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
                role: payload.role || Role.ADMIN,
                name: payload.name,
            },
            select: {
                username: true,
                name: true,
                role: true,
            },
        });

        return {
            isOk: true,
            data: newAccount,
            message: 'Create new account successfully.',
        };
    } catch {
        return {
            isOk: false,
            error: 'Something went wrong.',
        };
    }
};
