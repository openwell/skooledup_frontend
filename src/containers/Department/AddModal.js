import React, { useEffect, useState, useRef } from 'react';
import { Modal, Input, Button, notification, Form, Select } from 'antd';
import { departmentApis, schoolApis, facultyApis } from 'apis';
const { Option } = Select;
export default function AddModal() {
  const formRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [department, setDepartment] = useState({
    department_name: '',
    school_id: '',
    faculty_id: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  useEffect(() => {
    const getSchools = async () => {
      try {
        const res = await schoolApis.getAllSchools();
        console.log(res);
        setSchoolList(res.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSchools();
    return () => {};
  }, []);
  const getFacultyBySchoolId = async (id) => {
    try {
      const res = await facultyApis.getFacultiesBySchoolId({
        school_id: id,
      });
      console.log(res);
      setFacultyList(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChangeHandler = (e, v) => {
    e.preventDefault();
    const { value, name } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      const refRes = await formRef.current.validateFields();
      setLoading(true);
      console.log(department);
      const res = await departmentApis.addDepartment({
        department_name: department.department_name,
        faculty_id: department.faculty_id,
      });
      console.log(res.data);
      if (res.data.data.message == 'success') {
        formRef.current.resetFields();
        notification.success({
          message: 'Success',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      console.dir(error.message || error);
      notification.error({
        message: 'Error',
        description: error?.response?.statusText || 'Error',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Department
      </Button>
      <Modal
        title="New Department"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okButtonProps={{ loading: isLoading }}
        okText="Submit"
      >
        <Form ref={formRef} name="control-ref">
          <Form.Item
            label="School"
            name="school_name"
            rules={[
              {
                required: true,
                message: 'Please input your school Name!',
              },
            ]}
          >
            <Select
              onChange={(value) => {
                setDepartment((prev) => ({ ...prev, school_id: value }));
                getFacultyBySchoolId(value);
              }}
              placeholder="Select School"
            >
              {schoolList.map((elem) => {
                return (
                  <Option key={elem.id} value={elem.id}>
                    {elem.school_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Faculty"
            name="faculty_name"
            rules={[
              {
                required: true,
                message: 'Please input your faculty Name!',
              },
            ]}
          >
            <Select
              onChange={(value) =>
                setDepartment((prev) => ({ ...prev, faculty_id: value }))
              }
              placeholder="Select Faculty"
            >
              {facultyList.map((elem) => {
                return (
                  <Option key={elem.id} value={elem.id}>
                    {elem.faculty}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Department Name"
            name="department_name"
            rules={[
              {
                required: true,
                min: 5,
                message: 'Please input your department Name!',
              },
            ]}
          >
            <Input
              label="Department"
              placeholder="Name"
              value={department.department_name}
              name="department_name"
              onChange={onChangeHandler}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
