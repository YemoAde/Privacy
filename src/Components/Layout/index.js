import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SidebarComponent from './Sidebar.component';
import './index.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SidebarComponent />
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}