import React, { useEffect, useState, useRef } from 'react';
import { Modal, Input, Button, notification, Form, Select } from 'antd';
import { facultyApis, schoolApis } from 'apis';
const { Option } = Select;
export default function AddModal() {
  const formRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [faculty, setFaculty] = useState({ faculty_name: '', school_id: '' });
  const [isLoading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
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

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChangeHandler = (e, v) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFaculty((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      const refRes = await formRef.current.validateFields();
      setLoading(true);
      console.log(faculty);
      const res = await facultyApis.addFaculty({
        faculty_name: faculty.faculty_name,
        school_id: faculty.school_id,
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
        Add Faculty
      </Button>
      <Modal
        title="New Faculty"
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
              onChange={(value) =>
                setFaculty((prev) => ({ ...prev, school_id: value }))
              }
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
            label="Faculty Name"
            name="faculty_name"
            rules={[
              {
                required: true,
                min: 5,
                message: 'Please input your school Name!',
              },
            ]}
          >
            <Input
              label="Faculty"
              placeholder="Name"
              value={faculty.faculty_name}
              name="faculty_name"
              onChange={onChangeHandler}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
