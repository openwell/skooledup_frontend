import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import styled from 'styled-components';
import { courseApis } from 'apis';
import CustomLayout from 'layout/LayoutOne';
import { navigate } from '@reach/router';
// import EditModal from './EditModal';

const columns = [
  {
    title: 'School',
    dataIndex: 'school_name',
    key: 'school_name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_name',
    key: 'faculty_name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Department',
    dataIndex: 'department_name',
    key: 'department_name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Course',
    dataIndex: 'course_name',
    key: 'course',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Levy',
    dataIndex: 'levy',
    key: 'levy',
    render: (text) => <p>{text}</p>,
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          {/* <EditModal courseData={text} /> */}
          <p>Delete</p>
        </Space>
      );
    },
  },
];
export default function Course() {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await courseApis.getAllCourses();
        console.log(res);
        setCourseList(res.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
    return () => {};
  }, []);
  const navigationHandler = (dest) => {
    navigate(dest);
  };
  return (
    <Styled>
      <CustomLayout>
        <Button type="primary" onClick={() => navigationHandler('/add-course')}>
          Add Course
        </Button>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {courseList?.length > 0 && (
            <Table columns={columns} dataSource={courseList} rowKey="id" />
          )}
        </div>
      </CustomLayout>
    </Styled>
  );
}
const Styled = styled.div``;
