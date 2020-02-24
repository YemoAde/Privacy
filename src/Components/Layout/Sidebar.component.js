import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { useHistory } from 'react-router-dom';
const { Sider } = Layout;



export default () => {

    const { push } = useHistory()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" onClick={() => push('/')}>
                    <Icon type="pie-chart" />
                    <span>Home</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => push('/rsa')}>
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>

                <Menu.Item key="3">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="file" />
                    <span>File</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}