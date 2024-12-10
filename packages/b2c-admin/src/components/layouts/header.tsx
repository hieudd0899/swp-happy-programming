'use client';

import { useMutation } from '@tanstack/react-query';
import { Button, Popover } from 'antd';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import { handleLogout } from '~/actions/auth/logout';

const Content = () => {
    const { mutate } = useMutation({
        mutationFn: () => {
            return handleLogout();
        },
        onSuccess: (res) => {
            toast.success(res.message);
            setTimeout(() => {
                window.location.reload();
            }, 300);
        },
        onError: (err) => {
            toast.error(err.message);
            setTimeout(() => {
                window.location.reload();
            }, 300);
        },
    });

    return (
        <div className="flex flex-col">
            <Button icon={<User className="h-4 w-4" />} type="text">
                Profile
            </Button>
            <Button
                icon={<LogOut className="h-4 w-4" />}
                onClick={() => {
                    mutate();
                }}
                type="text"
            >
                Logout
            </Button>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="flex h-full items-center justify-between">
            <Link className="text-2xl font-bold drop-shadow-md" href="/">
                Coursera
            </Link>
            <Popover content={Content} placement="bottomLeft">
                <Button
                    className="group"
                    icon={
                        <User className="h-4 w-4 text-slate-500 transition group-hover:text-blue-500" />
                    }
                    shape="circle"
                />
            </Popover>
        </div>
    );
};
