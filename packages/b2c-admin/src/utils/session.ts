import { cookies } from 'next/headers';
import { accessTokenCookieName } from '../constants';

export const session = async () => {
    const cookieStore = await cookies();

    const token = await cookieStore.get(accessTokenCookieName);

    return token;
};

export const setSession = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set(accessTokenCookieName, token);
};
