import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getMe } from '~/actions/profile/me';

const Home = async () => {
    const user = await getMe();

    if (user && user.role === Role.ADMIN) {
        redirect('/admin/dashboard');
    }

    return null;
};

export default Home;
