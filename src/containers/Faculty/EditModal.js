import React, { useEffect, useState } from 'react';
import { Modal, Input, notification } from 'antd';
import { facultyApis } from 'apis';
export default function EditModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [faculty, setFaculty] = useState('');
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const setData = () => {
      setFaculty(props.facultyData.faculty);
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
      const res = await facultyApis.updateFacultyById({
        id: props.facultyData.id,
        data: { faculty_name: faculty },
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
        title="Edit Faculty"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: isLoading }}
        okText="Submit"
      >
        <Input
          placeholder="Basic usage"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />
      </Modal>
    </>
  );
}
