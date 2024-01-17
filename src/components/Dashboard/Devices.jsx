import React, { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Breadcrumb } from 'antd';
import { Divider } from 'antd';
import { Input, Tree } from 'antd';
import { Table } from 'antd';

const { Search } = Input;


const initTreeData = [
    {
        title: 'Expand to load',
        key: '0',
    },
    {
        title: 'Expand to load',
        key: '1',
    },
    {
        title: 'Tree Node',
        key: '2',
        isLeaf: true,
    },
];

const updateTreeData = (list, key, children) =>
    list.map((node) => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children),
            };
        }
        return node;
    });
function Devices() {
    const [treeData, setTreeData] = useState(initTreeData);
    const onLoadData = ({ key, children }) => {
        new Promise((resolve) => {
            if (children) {
                resolve();
                return;
            }
            setTimeout(() => {
                setTreeData((origin) =>
                    updateTreeData(origin, key, [
                        {
                            title: 'Child Node',
                            key: `${key}-0`,
                        },
                        {
                            title: 'Child Node',
                            key: `${key}-1`,
                        },
                    ]),
                );
                resolve();
            }, 1000);
        });
    }
    return (
        <Container className='col'>
            <div className="head-bar pt-5 d-flex justify-content-between">
                <Divider orientation="left" orientationMargin="0"><span className="text-uppercase fw-bold fs-4">Danh sách thiết bị xoá</span></Divider>
            </div>
            <Breadcrumb className='pt-2'
                items={[
                    {
                        title: <a href="#data">Dữ liệu </a>,
                    },
                    {
                        title: <a href="datatable">Bảng biểu</a>,
                    },
                ]}
            />
            <div className='pt-4'>
                <Table
                    bordered
                    title={() => 'Bảng dữ liệu thiết bị'}

                />
            </div>

        </Container>

    )
}

export default Devices
