'use server';

import { db } from 'common/libs/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ActionResponseType } from '~/types/action-type';
import { setSession } from '~/utils/session';

type LoginAccount = {
    username: string;
    password: string;
};

export const handleLogin = async (
    payload: LoginAccount
): Promise<ActionResponseType<{ token: string }>> => {
    try {
        const account = await db.user.findUnique({
            where: {
                username: payload.username,
            },
        });

        if (!account) {
            return {
                isOk: false,
                error: 'Wrong username or password.Try again.',
            };
        }

        const correctPassword = await bcrypt.compareSync(
            payload.password,
            account.hashedPassword
        );

        if (!correctPassword) {
            return {
                isOk: false,
                error: 'Wrong username or password.Try again.',
            };
        }

        const session = await db.session.create({
            data: {
                userId: account.id,
                access_token: jwt.sign(
                    {
                        id: account.id,
                        username: account.username,
                        name: account.name,
                    },
                    process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY!
                ),
            },
        });

        await setSession(session.access_token);

        return {
            isOk: true,
            data: {
                token: session.access_token,
            },
            message: 'Login successfully.',
        };
    } catch {
        return {
            isOk: false,
            error: 'Wrong username or password.Try again.',
        };
    }
};
