import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import styled from 'styled-components';
import { schoolApis } from 'apis';
import EditModal from './EditModal';
import AddModal from './AddModal';
import CustomLayout from 'layout/LayoutOne';

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
  useEffect(() => {
    const getSchools = async () => {
      try {
        const res = await schoolApis.getAllSchools();
        console.log(res.data);
        setSchoolList(res.data.data.data);
      } catch (error) {
        console.log(error);
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
          {schoolList.length > 0 && (
            <Table columns={columns} dataSource={schoolList} rowKey="id" />
          )}
        </div>
      </CustomLayout>
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
