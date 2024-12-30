'use client';

import React, { ElementRef, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { DialogClose, DialogFooter } from '~/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { handleRegister } from '~/actions/auth/register';

const registerFormSchema = z
    .object({
        username: z.string().min(6, {
            message: 'Username must be at least 6 characters.',
        }),
        password: z.string().min(8, {
            message: 'Password must be at least 6 characters.',
        }),
        confirmPassword: z.string().min(1, {
            message: 'Please confirm your password.',
        }),
        role: z.enum([Role.MENTEE, Role.MENTOR], {
            required_error: 'You need to select a role.',
        }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword && password && confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password did not match.',
                path: ['confirmPassword'],
            });
        }
    });

const RegisterForm = () => {
    const closeModalRef = useRef<ElementRef<'button'>>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: (
            payload: Omit<z.infer<typeof registerFormSchema>, 'confirmPassword'>
        ) => {
            return handleRegister(payload);
        },
        onSuccess: (res) => {
            if (res.isOk) {
                toast.success(res.message);
                setTimeout(() => {
                    closeModalRef.current?.click();
                }, 300);
            } else {
                toast.error(res.message);
            }
        },
        onError: () => {
            toast.error('Something went wrong.');
        },
    });

    const registerForm = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            role: Role.MENTEE,
        },
    });

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        mutate({
            username: values.username,
            password: values.password,
            role: values.role,
        });
    };

    return (
        <Form {...registerForm}>
            <form
                className="space-y-4"
                onSubmit={registerForm.handleSubmit(onSubmit)}
            >
                <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-7 items-center">
                            <FormLabel>You are:</FormLabel>
                            <FormControl className="col-span-3">
                                <RadioGroup
                                    className="flex space-x-4"
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    {[Role.MENTEE, Role.MENTOR].map((role) => (
                                        <FormItem className="flex items-center space-x-1 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={role} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {role.charAt(0).toUpperCase() +
                                                    role
                                                        .toLocaleLowerCase()
                                                        .slice(1)}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild ref={closeModalRef}>
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={isPending} type="submit">
                        Register{isPending && '...'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default RegisterForm;
