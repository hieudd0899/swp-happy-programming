'use client';

import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Spin, Table, TableProps } from 'antd';

import React from 'react';
import { getMentors } from '~/actions/queries/mentors';

type TableDataType = Pick<
    User,
    'id' | 'name' | 'address' | 'dob' | 'email' | 'username' | 'isActivated'
>;
export const MentorList = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['mentor-list'],
        queryFn: () => {
            return getMentors();
        },
    });

    const columns: TableProps<TableDataType>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'stt',
            render(_, record, index) {
                return <p>{index + 1}</p>;
            },
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <Spin spinning={isLoading}>
                <Table<TableDataType>
                    columns={columns}
                    dataSource={data?.data}
                />
            </Spin>
        </div>
    );
};
