'use server';

import { db } from 'common/libs/db';
import { ActionResponseType } from 'common/types/action-type';
import { removeSession, session } from '~/utils/session';
import { getMe } from '../profile/me';

export const handleLogout = async (): Promise<ActionResponseType<null>> => {
    try {
        const me = await getMe();
        const token = await session();

        if (!me) {
            await removeSession();
            return {
                isOk: true,
                message: 'Logout successfully.',
            };
        }

        if (!token) {
            await removeSession();
            return {
                isOk: true,
                message: 'Logout successfully.',
            };
        }

        const currentSession = await db.session.findFirst({
            where: {
                access_token: token.value,
                user: {
                    id: me.id,
                },
            },
        });

        await db.session.delete({
            where: {
                id: currentSession?.id,
            },
        });

        await removeSession();

        return {
            isOk: true,
            message: 'Logout successfully.',
        };
    } catch {
        return {
            isOk: true,
            message: 'Logout successfully.',
        };
    }
};
