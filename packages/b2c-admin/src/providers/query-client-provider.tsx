'use client';

import {
    QueryClient,
    QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <TanstackQueryClientProvider client={queryClient}>
            {children}
        </TanstackQueryClientProvider>
    );
};
