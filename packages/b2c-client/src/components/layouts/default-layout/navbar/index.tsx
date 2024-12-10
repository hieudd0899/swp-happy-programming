'use client';

import React from 'react';
import Link from 'next/link';
import { RegisterModal } from '~/components/modals/register';
import { Button } from '~/components/ui/button';
import { SelectTheme } from './select-theme';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 h-[60px] w-full border-b bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-800">
            <div className="container flex h-full items-center justify-between">
                <Link
                    className="text-2xl font-bold uppercase text-blue-500 drop-shadow-md"
                    href="/"
                >
                    Coursera
                </Link>
                <div className="flex items-center space-x-2">
                    <SelectTheme />
                    <RegisterModal />
                    <Button>Sign In</Button>
                </div>
            </div>
        </nav>
    );
};
