'use server';

import { Role, User } from '@prisma/client';
import { db } from 'common/libs/db';
import { ActionResponseType } from 'common/types/action-type';

type ResponseDataType = Pick<
    User,
    'id' | 'name' | 'address' | 'dob' | 'email' | 'username' | 'isActivated'
>;

export const getMentors = async (): Promise<
    ActionResponseType<ResponseDataType[]>
> => {
    try {
        const mentors = await db.user.findMany({
            where: {
                role: Role.MENTOR,
            },
            select: {
                id: true,
                name: true,
                username: true,
                address: true,
                dob: true,
                email: true,
                isActivated: true,
            },
        });
        return {
            isOk: true,
            data: mentors,
        };
    } catch {
        return {
            isOk: false,
            error: 'Something went wrong.',
        };
    }
};
