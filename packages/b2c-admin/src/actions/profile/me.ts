'use server';

import { sessionInfo } from '~/utils/session';

export const getMe = async () => {
    const me = await sessionInfo();
    return me;
};
