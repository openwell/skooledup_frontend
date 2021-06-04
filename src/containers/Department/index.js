import React, { useEffect, useState } from 'react';
import { Table, Space, Spin, Empty } from 'antd';
import styled from 'styled-components';
import { departmentApis } from 'apis';
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
    title: 'Department Name',
    dataIndex: 'department',
    key: 'department',
    render: (text) => <p>{text}</p>,
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <EditModal departmentData={text} />
          <p>Delete</p>
        </Space>
      );
    },
  },
];
export default function Department() {
  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getDeparts = async () => {
      try {
        setLoading(true);
        const res = await departmentApis.getDepartments();
        console.log(res);
        setDepartmentList(res.data.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    getDeparts();
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
              {departmentList?.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={departmentList}
                  rowKey="id"
                />
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
