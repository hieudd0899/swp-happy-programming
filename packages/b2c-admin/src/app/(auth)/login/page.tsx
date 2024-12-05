import { db } from 'common/libs/db';
import { redirect } from 'next/navigation';
import React from 'react';
import { LoginPage } from '~/components/pages/auth/login';
import { session } from '~/utils/session';

const Login = async () => {
    const users = await db.user.count();

    const auth = await session();

    if (auth) {
        redirect('/');
    }

    if (!users) {
        redirect('/create-first-account');
    }

    return (
        <div>
            <LoginPage />
        </div>
    );
};

export default Login;
