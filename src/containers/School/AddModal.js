import React, { useState, useRef } from 'react';
import { Modal, Input, Button, notification, Form } from 'antd';
import { schoolApis } from 'apis';
export default function AddModal() {
  const formRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [school, setSchool] = useState({
    school_logo: '',
    school_name: '',
  });
  const [isLoading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setSchool((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await schoolApis.addSchool({
        school_name: school.school_name,
        school_logo: school.school_logo,
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
      notification.error({
        message: 'Error',
        description: error.response.statusText,
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
        Add School
      </Button>
      <Modal
        title="New School"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okButtonProps={{ loading: isLoading }}
      >
        <Form
          // {...layout}
          ref={formRef}
          name="control-ref"
          // initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="School Name"
            name="school_name"
            rules={[
              {
                required: true,
                min: 5,
                message: 'Please input your School Name!',
              },
            ]}
          >
            <Input
              label="School"
              placeholder="Name"
              value={school.school_name}
              name="school_name"
              onChange={onChangeHandler}
            />
          </Form.Item>
          <Form.Item
            label="School Logo Url"
            name="school_logo"
            rules={[
              {
                type: 'url',
              },
            ]}
          >
            <Input
              label="School Logo Url"
              addonBefore="https://"
              value={school.school_logo}
              name="school_logo"
              placeholder="Url"
            />
          </Form.Item>
        </Form>
        <br />
        <br />
      </Modal>
    </>
  );
}
