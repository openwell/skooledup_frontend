import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { navigate, useLocation } from '@reach/router';
const { Header, Content, Footer, Sider } = Layout;

export default function LayOut(props) {
  const location = useLocation();
  const navigationHandler = (dest) => {
    navigate(dest);
  };
  const getCurrentNav = (location) => {
    let response;
    switch (location.pathname) {
      case '/':
        response = '1';
        break;
      case '/faculty':
        response = '2';
        break;
      case '/department':
        response = '3';
        break;
      case '/degree':
        response = '4';
        break;
      case '/course':
        response = '5';
        break;
      default:
        response = '0';
        break;
    }
    return response;
  };
  return (
    <Styled>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[getCurrentNav(location)]}
          >
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              onClick={() => {
                navigationHandler('/');
              }}
            >
              School
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined />}
              onClick={() => {
                navigationHandler('/faculty');
              }}
            >
              Faculties
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UploadOutlined />}
              onClick={() => {
                navigationHandler('/department');
              }}
            >
              Departments
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UserOutlined />}
              onClick={() => {
                navigationHandler('/degree');
              }}
            >
              Degrees
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<UserOutlined />}
              onClick={() => {
                navigationHandler('/course');
              }}
            >
              Courses
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: '24px 16px 0' }}>{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            SkooledUp ©2020 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Styled>
  );
}
const Styled = styled.div`
  /*   #components-layout-demo-responsive  */
  .my-link {
    cursor: pointer;
  }
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .site-layout-sub-header-background {
    background: #fff;
  }

  .site-layout-background {
    background: #fff;
  }
`;
