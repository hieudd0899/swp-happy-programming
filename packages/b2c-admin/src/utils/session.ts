import { cookies } from 'next/headers';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { db } from 'common/libs/db';
import { accessTokenCookieName } from '../constants';

type TokenDecodedType = JwtPayload & {
    id: string;
    username: string;
    name: string;
};

export const session = async () => {
    const cookieStore = await cookies();

    const token = await cookieStore.get(accessTokenCookieName);

    return token;
};

export const setSession = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set(accessTokenCookieName, token);
};

export const removeSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(accessTokenCookieName);
};

export const sessionInfo = async () => {
    const token = await session();
    if (token) {
        const tokenDecoded: TokenDecodedType = jwtDecode(token.value);

        const me = await db.user.findUnique({
            where: {
                id: tokenDecoded.id,
            },
            select: {
                id: true,
                username: true,
                name: true,
                address: true,
                gender: true,
                dob: true,
                email: true,
                phone: true,
                role: true,
            },
        });

        return me;
    }
    return undefined;
};
