'use client';

import { Button, Form, Input } from 'antd';
import React from 'react';
import type { FormProps } from 'antd';

type RegisterFieldType = {
    name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
};

export const CreateFirstAccountPage = () => {
    const onFinish: FormProps<RegisterFieldType>['onFinish'] = (values) => {
        console.log(values);
    };
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="max-h-[80vh] w-[450px] overflow-auto rounded-lg border p-4 shadow-lg">
                <h1 className="mb-4 text-center text-2xl font-bold">
                    Admin panel
                </h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item<RegisterFieldType>
                        label="Name"
                        name="name"
                        required
                        rules={[
                            { required: true, message: 'Enter your name.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<RegisterFieldType>
                        label="Username"
                        name="username"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Please enter username.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<RegisterFieldType>
                        label="Password"
                        name="password"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password.',
                            },
                            { min: 8, message: 'Your password to short.' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<RegisterFieldType>
                        dependencies={['password']}
                        hasFeedback
                        label="Confirm Password"
                        name="confirmPassword"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered do not match!'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button className="w-full" htmlType="submit" type="primary">
                        Create new account
                    </Button>
                </Form>
            </div>
        </div>
    );
};
