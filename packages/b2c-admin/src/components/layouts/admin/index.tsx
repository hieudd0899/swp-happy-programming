'use client';

import { Layout } from 'antd';
import React from 'react';
import { Header as CustomHeader } from '~/components/layouts/header';
import { AdminSider } from './sider';

const { Header, Sider, Content } = Layout;

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <Layout>
            <Header className="border-b bg-white shadow-md">
                <CustomHeader />
            </Header>
            <Content>
                <Layout>
                    <Sider className="border-r bg-white">
                        <AdminSider />
                    </Sider>
                    <Content className="h-[calc(100vh_-_64px)] overflow-auto p-6">
                        {children}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};
