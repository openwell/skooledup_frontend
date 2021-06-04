import React, { useEffect, useState } from 'react';
import { Table, Space, Spin, Empty } from 'antd';
import styled from 'styled-components';
import { facultyApis } from 'apis';
import CustomLayout from 'layout/LayoutOne';
import EditModal from './EditModal';
import AddModal from './AddModal';

const columns = [
  {
    title: 'School Name',
    dataIndex: 'school',
    key: 'school',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Faculty Name',
    dataIndex: 'faculty',
    key: 'faculty',
    render: (text) => <p>{text}</p>,
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <EditModal facultyData={text} />
          <p>Delete</p>
        </Space>
      );
    },
  },
];
export default function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getFaculties = async () => {
      try {
        setLoading(true);
        const res = await facultyApis.getFaculties();
        console.log(res);
        setFacultyList(res.data.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFaculties();
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
              {facultyList.length > 0 ? (
                <Table columns={columns} dataSource={facultyList} rowKey="id" />
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
  .center_spinner {
    display: flex;
    justify-content: center;
  }
`;
