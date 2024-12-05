import { db } from 'common/libs/db';
import { redirect } from 'next/navigation';
import React from 'react';
import { CreateFirstAccountPage } from '~/components/pages/auth/create-first-account';
import { session } from '~/utils/session';

const CreateFirstAccount = async () => {
    const users = await db.user.count();
    const auth = await session();

    if (auth) {
        redirect('/');
    }

    if (users) {
        redirect('/login');
    }

    return (
        <div>
            <CreateFirstAccountPage />
        </div>
    );
};

export default CreateFirstAccount;
