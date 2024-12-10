'use client';

import React from 'react';
import { Navbar } from './navbar';

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <>
            <Navbar />
            <div className="mt-[60px]">{children}</div>
        </>
    );
};
