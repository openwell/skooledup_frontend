import React, { useEffect, useState } from 'react';
import { Table, Space, Avatar, Spin, Empty } from 'antd';
import styled from 'styled-components';
import { schoolApis } from 'apis';
import { PictureOutlined } from '@ant-design/icons';
import EditModal from './EditModal';
import AddModal from './AddModal';
import CustomLayout from 'layout/LayoutOne';
// DeleteOutlined EditOutlined
const columns = [
  {
    title: 'School Name',
    dataIndex: 'school_name',
    key: 'school_name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Logo',
    dataIndex: 'school_logo',
    key: 'school_logo',
    render: (text) => <Avatar size="large" icon={<PictureOutlined />} />,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <EditModal schoolData={text} />
          <p>Delete</p>
        </Space>
      );
    },
  },
];
export default function Home() {
  const [schoolList, setSchoolList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getSchools = async () => {
      try {
        setLoading(true);
        const res = await schoolApis.getAllSchools();
        console.log(res.data);
        setSchoolList(res.data.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSchools();
    return () => {};
  }, []);

  return (
    <Styled>
      <CustomLayout>
        <AddModal />
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {isLoading ? (
            <div className="center_spinner">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {schoolList.length > 0 ? (
                <Table columns={columns} dataSource={schoolList} rowKey="id" />
              ) : (
                <Empty />
              )}
            </>
          )}
        </div>
      </CustomLayout>
    </Styled>
  );
}
const Styled = styled.div`
  /*   #components-layout-demo-responsive  */
  .center_spinner {
    display: flex;
    justify-content: center;
  }
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
