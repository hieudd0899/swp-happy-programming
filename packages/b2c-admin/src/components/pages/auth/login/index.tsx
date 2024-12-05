'use client';

import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import React from 'react';
import { toast } from 'sonner';
import { handleLogin } from '~/actions/auth/login';

type LoginFieldType = {
    username: string;
    password: string;
};

export const LoginPage = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (payload: LoginFieldType) => {
            return handleLogin(payload);
        },
        onSuccess: async (res) => {
            if (res.isOk && res.data?.token) {
                toast.success(res.message);
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            } else {
                toast.error(res.error);
            }
        },
        onError: () => {
            toast.error('Wrong username or password.');
        },
    });

    const onFinish: FormProps<LoginFieldType>['onFinish'] = (values) => {
        mutate(values);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="max-h-[80vh] w-[450px] rounded-lg border p-4 shadow-lg">
                <h1 className="mb-4 text-center text-2xl font-bold">
                    Welcome to admin panel
                </h1>
                <Form
                    disabled={isPending}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<LoginFieldType>
                        label="Username"
                        name="username"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<LoginFieldType>
                        label="Password"
                        name="password"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button
                        className="w-full"
                        htmlType="submit"
                        loading={isPending}
                        size="large"
                        type="primary"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};
