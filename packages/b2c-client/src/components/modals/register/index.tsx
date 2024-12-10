'use client';

import React from 'react';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import RegisterForm from './register-form';

export const RegisterModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">Sign up</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Welcome back Coursera</DialogTitle>
                    <DialogDescription>
                        You can create your account is here.
                    </DialogDescription>
                </DialogHeader>
                <RegisterForm />
            </DialogContent>
        </Dialog>
    );
};
