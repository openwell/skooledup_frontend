import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import styled from 'styled-components';
import { degreeApis } from 'apis';
import CustomLayout from 'layout/LayoutOne';
import EditModal from './EditModal';
// import AddModal from './AddModal';

const columns = [
  {
    title: 'Degree Name',
    dataIndex: 'degree_name',
    key: 'degree',
    render: (text) => <p>{text}</p>,
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <EditModal degreeData={text} />
          <p>Delete</p>
        </Space>
      );
    },
  },
];
export default function Degree() {
  const [degreeList, setDegreeList] = useState([]);
  useEffect(() => {
    const getDegrees = async () => {
      try {
        const res = await degreeApis.getAllDegrees();
        console.log(res);
        setDegreeList(res.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDegrees();
    return () => {};
  }, []);

  return (
    <Styled>
      <CustomLayout>
        {/* <AddModal /> */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {degreeList?.length > 0 && (
            <Table columns={columns} dataSource={degreeList} rowKey="id" />
          )}
        </div>
      </CustomLayout>
    </Styled>
  );
}
const Styled = styled.div``;
