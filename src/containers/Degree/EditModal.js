import React, { useEffect, useState } from 'react';
import { Modal, Input, notification } from 'antd';
import { degreeApis } from 'apis';
export default function EditModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [degree, setDegree] = useState('');
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const setData = () => {
      setDegree(props.degreeData.degree_name);
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
      const res = await degreeApis.updateDegreeById({
        id: props.degreeData.id,
        data: { degree_name: degree },
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
        title="Edit Degree"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: isLoading }}
        okText="Submit"
      >
        <Input
          placeholder="Basic usage"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </Modal>
    </>
  );
}
