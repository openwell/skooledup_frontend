import React, { useEffect, useState } from 'react';
import { Modal, Input, notification } from 'antd';
import { departmentApis } from 'apis';
export default function EditModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [department, setDepartment] = useState('');
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const setData = () => {
      setDepartment(props.departmentData.department);
    };
    setData();
    return () => {};
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const res = await departmentApis.updateDepartmentById({
        id: props.departmentData.id,
        data: { department_name: department },
      });
      console.log(res.data);
      if (res.data.data.message == 'success') {
        notification.success({
          message: 'Success',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      console.dir(error.message);
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
      <p className="my-link" onClick={showModal}>
        Edit
      </p>
      <Modal
        title="Edit Department"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: isLoading }}
        okText="Submit"
      >
        <Input
          placeholder="Basic usage"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Modal>
    </>
  );
}
