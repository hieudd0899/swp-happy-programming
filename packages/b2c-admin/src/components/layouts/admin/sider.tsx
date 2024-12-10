'use client';

import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'dashboard',
        label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
        key: 'mentor',
        label: <Link href="/admin/mentors">Mentors</Link>,
    },
];

export const AdminSider = () => {
    return (
        <Menu
            className="h-full w-full overflow-auto"
            items={items}
            mode="inline"
        />
    );
};
