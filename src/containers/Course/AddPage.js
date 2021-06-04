import React, { useEffect, useState, useRef } from 'react';
import {
  Typography,
  Input,
  Button,
  notification,
  Form,
  Select,
  Row,
  Col,
  DatePicker,
} from 'antd';
import {
  departmentApis,
  schoolApis,
  facultyApis,
  courseApis,
  degreeApis,
} from 'apis';
import CustomLayout from 'layout/LayoutOne';
const { Option } = Select;
const { Title } = Typography;
export default function Add() {
  const formRef = useRef();
  const [course, setCourse] = useState({
    department_id: '',
    school_id: '',
    faculty_id: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
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
  const getDepartmentByFacultyId = async (id) => {
    try {
      const res = await departmentApis.getDepartmentsByFacultyId({
        faculty_id: id,
      });
      console.log(res);
      setDepartmentList(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e, v) => {
    e.preventDefault();
    const { value, name } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      const refRes = await formRef.current.validateFields();
      setLoading(true);
      console.log(course);
      const res = await courseApis.addCourse(course);
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

  return (
    <div>
      <CustomLayout>
        <Title level={2}>Create Course</Title>
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          ref={formRef}
          name="control-ref"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                label="School"
                name="school_name"
                rules={[
                  {
                    required: true,
                    message: 'Please select your school',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({ ...prev, school_id: value }));
                    getFacultyBySchoolId(value);
                    formRef.current.setFieldsValue({
                      faculty_id: null,
                      department_id: null,
                    });
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
            </Col>
            <Col span={12}>
              <Form.Item
                label="Faculty"
                name="faculty_id"
                rules={[
                  {
                    required: true,
                    message: 'Please select your faculty',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({ ...prev, faculty_id: value }));
                    getDepartmentByFacultyId(value);
                    formRef.current.setFieldsValue({ department_id: null });
                  }}
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
            </Col>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department_id"
                rules={[
                  {
                    required: true,
                    message: 'Please select your department',
                  },
                ]}
              >
                <Select
                  onChange={(value) =>
                    setCourse((prev) => ({ ...prev, department_id: value }))
                  }
                  placeholder="Select Department"
                >
                  {departmentList.map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.id}>
                        {elem.department}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Degree"
                name="degree_id"
                rules={[
                  {
                    required: true,
                    message: 'Please select your degree',
                  },
                ]}
              >
                <Select
                  onChange={(value) =>
                    setCourse((prev) => ({ ...prev, degree_id: value }))
                  }
                  placeholder="Select Degree"
                >
                  {degreeList.map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.id}>
                        {elem.degree_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Course Name"
                name="course_name"
                rules={[
                  {
                    required: true,
                    min: 2,
                    message: 'Please input your course ',
                  },
                ]}
              >
                <Input
                  label="Course"
                  placeholder="Course"
                  value={course.course_name}
                  name="course_name"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Duration"
                name="dur"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your dur',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      dur: value,
                    }));
                  }}
                  placeholder="dur"
                >
                  {[
                    { id: '2 Years', value: '2 Years' },
                    { id: '3 Years', value: '3 Years' },
                    { id: '4 Years', value: '4 Years' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                label="Duration"
                name="dur"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your dur ',
                  },
                ]}
              >
                <Input
                  label="dur"
                  placeholder="dur"
                  value={course.dur}
                  name="dur"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="Tuition Fee Local"
                name="tui_fee_local"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your tui_fee_local ',
                  },
                ]}
              >
                <Input
                  label="tui_fee_local"
                  placeholder="tui_fee_local"
                  value={course.tui_fee_local}
                  name="tui_fee_local"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tuition Fee International"
                name="tui_fee_int"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your tui_fee_int ',
                  },
                ]}
              >
                <Input
                  label="tui_fee_int"
                  placeholder="tui_fee_int"
                  value={course.tui_fee_int}
                  name="tui_fee_int"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Levy"
                name="levy"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your levy ',
                  },
                ]}
              >
                <Input
                  label="levy"
                  placeholder="levy"
                  value={course.levy}
                  name="levy"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Levy Non African"
                name="levy_non_african"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your levy_non_african ',
                  },
                ]}
              >
                <Input
                  label="levy_non_african"
                  placeholder="levy_non_african"
                  value={course.levy_non_african}
                  name="levy_non_african"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Local App Fee (Online)"
                name="local_app_fee_online"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your local_app_fee_online ',
                  },
                ]}
              >
                <Input
                  label="local_app_fee_online"
                  placeholder="local_app_fee_online"
                  value={course.local_app_fee_online}
                  name="local_app_fee_online"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Local App Fee (Paper based)"
                name="local_app_fee_paper"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your local_app_fee_paper ',
                  },
                ]}
              >
                <Input
                  label="local_app_fee_paper"
                  placeholder="local_app_fee_paper"
                  value={course.local_app_fee_paper}
                  name="local_app_fee_paper"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="International  App Fee (Online)"
                name="int_app_fee_online"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your int_app_fee_online ',
                  },
                ]}
              >
                <Input
                  label="int_app_fee_online"
                  placeholder="int_app_fee_online"
                  value={course.int_app_fee_online}
                  name="int_app_fee_online"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="International  App Fee (Paper based)"
                name="int_app_fee_paper"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your int_app_fee_paper',
                  },
                ]}
              >
                <Input
                  label="int_app_fee_paper"
                  placeholder="int_app_fee_paper"
                  value={course.int_app_fee_paper}
                  name="int_app_fee_paper"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Study Mode Full Time"
                name="study_mode_full_time"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your study_mode_full_time',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      study_mode_full_time: value,
                    }));
                  }}
                  placeholder="study_mode_full_time"
                >
                  {[
                    { id: 1, value: 'Yes' },
                    { id: 2, value: 'No' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Study Mode Part Time"
                name="study_mode_part_time"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your study_mode_part_time',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      study_mode_part_time: value,
                    }));
                  }}
                  placeholder="study_mode_part_time"
                >
                  {[
                    { id: 1, value: 'Yes' },
                    { id: 2, value: 'No' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Min Requirement Local Aps"
                name="min_req_local_aps"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your min_req_local_aps',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      min_req_local_aps: value,
                    }));
                  }}
                  placeholder="min_req_local_aps"
                >
                  {[
                    { id: 'APS 19', value: 'APS 19' },
                    { id: 'APS 20', value: 'APS 20' },
                    { id: 'APS 21', value: 'APS 21' },
                    { id: 'APS 22', value: 'APS 22' },
                    { id: 'APS 23', value: 'APS 23' },
                    { id: 'APS 24', value: 'APS 24' },
                    { id: 'APS 25', value: 'APS 25' },
                    { id: 'APS 26', value: 'APS 26' },
                    { id: 'APS 27', value: 'APS 27' },
                    { id: 'APS 28', value: 'APS 28' },
                    { id: 'APS 29', value: 'APS 29' },
                    { id: 'APS 30', value: 'APS 30' },
                    { id: 'APS 31', value: 'APS 31' },
                    { id: 'APS 32', value: 'APS 32' },
                    { id: 'APS 33', value: 'APS 33' },
                    { id: 'APS 34', value: 'APS 34' },
                    { id: 'APS 35', value: 'APS 35' },
                    { id: 'APS 36', value: 'APS 36' },
                    { id: 'APS 37', value: 'APS 37' },
                    { id: 'APS 38', value: 'APS 38' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Min Requirement Local Eng"
                name="min_req_local_eng"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your min_req_local_eng',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      min_req_local_eng: value,
                    }));
                  }}
                  placeholder="min_req_local_eng"
                >
                  {[
                    { id: 'Level 3', value: 'Level 3' },
                    { id: 'Level 4', value: 'Level 4' },
                    { id: 'Level 5', value: 'Level 5' },
                    { id: 'Level 6', value: 'Level 6' },
                    { id: 'Level 7', value: 'Level 7' },
                    { id: 'Level 8', value: 'Level 8' },
                    { id: 'Not required', value: 'Not required' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Min Requirement Local Add Lang"
                name="min_req_local_add_lang"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your min_req_local_add_lang',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      min_req_local_add_lang: value,
                    }));
                  }}
                  placeholder="min_req_local_add_lang"
                >
                  {[
                    { id: 'Level 3', value: 'Level 3' },
                    { id: 'Level 4', value: 'Level 4' },
                    { id: 'Level 5', value: 'Level 5' },
                    { id: 'Level 6', value: 'Level 6' },
                    { id: 'Level 7', value: 'Level 7' },
                    { id: 'Level 8', value: 'Level 8' },
                    { id: 'Not required', value: 'Not required' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Min Requirement Local Maths"
                name="min_req_local_math"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your min_req_local_math',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      min_req_local_math: value,
                    }));
                  }}
                  placeholder="min_req_local_math"
                >
                  {[
                    { id: 'Level 3', value: 'Level 3' },
                    { id: 'Level 4', value: 'Level 4' },
                    { id: 'Level 5', value: 'Level 5' },
                    { id: 'Level 6', value: 'Level 6' },
                    { id: 'Level 7', value: 'Level 7' },
                    { id: 'Level 8', value: 'Level 8' },
                    { id: 'Not required', value: 'Not required' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Min Requirement Local Physics"
                name="min_req_local_physics"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your min_req_local_physics',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      min_req_local_physics: value,
                    }));
                  }}
                  placeholder="min_req_local_physics"
                >
                  {[
                    { id: 'Level 3', value: 'Level 3' },
                    { id: 'Level 4', value: 'Level 4' },
                    { id: 'Level 5', value: 'Level 5' },
                    { id: 'Level 6', value: 'Level 6' },
                    { id: 'Level 7', value: 'Level 7' },
                    { id: 'Level 8', value: 'Level 8' },
                    { id: 'Not required', value: 'Not required' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Minimum Requirement International"
                name="min_req_international"
                rules={[
                  {
                    //required: true,
                    min: 2,
                    message: 'Please input your min_req_international',
                  },
                ]}
              >
                <Input.TextArea
                  label="min_req_international"
                  placeholder="min_req_international"
                  value={course.min_req_international}
                  name="min_req_international"
                  onChange={onChangeHandler}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hero Image"
                name="hero_image"
                rules={[
                  {
                    message: 'Please input your hero_image',
                  },
                ]}
              >
                <Input
                  label="Course Image Url"
                  addonBefore="https://"
                  value={course.hero_image}
                  name="hero_image"
                  placeholder="Url"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Online Classes"
                name="online_classes"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your online_classes',
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    setCourse((prev) => ({
                      ...prev,
                      online_classes: value,
                    }));
                  }}
                  placeholder="online_classes"
                >
                  {[
                    { id: 1, value: 'Yes' },
                    { id: 2, value: 'No' },
                  ].map((elem) => {
                    return (
                      <Option key={elem.id} value={elem.value}>
                        {elem.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Application Date (Opening)"
                name="app_opening_date"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your app_opening_date',
                  },
                ]}
              >
                <DatePicker
                  label="app_opening_date"
                  placeholder="app_opening_date"
                  value={course.app_opening_date}
                  name="app_opening_date"
                  onChange={(e, value) => {
                    setCourse((prev) => ({ ...prev, app_opening_date: value }));
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Application Date (Closing)"
                name="app_closing_date"
                rules={[
                  {
                    //required: true,
                    message: 'Please input your app_closing_date',
                  },
                ]}
              >
                <DatePicker
                  name="app_closing_date"
                  onChange={(e, value) =>
                    setCourse((prev) => ({ ...prev, app_closing_date: value }))
                  }
                  label="app_closing_date"
                  placeholder="app_closing_date"
                  value={course.app_closing_date}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Note"
                name="note"
                rules={[
                  {
                    message: 'Please input your note',
                  },
                ]}
              >
                <Input.TextArea
                  // rows={4}
                  name="note"
                  onChange={onChangeHandler}
                  label="note"
                  placeholder="note"
                  value={course.note}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Submit
          </Button>
        </Form>
      </CustomLayout>
    </div>
  );
}
// <Col span={12} ></Col>
// course_name,
// depart_id,
// deg_id,
// // string
// dur,
// tui_fee_local,
// tui_fee_int,
// levy,
// local_app_fee_online,
// local_app_fee_paper,
// int_app_fee_online,
// int_app_fee_paper,
// study_mode_full_time,
// study_mode_part_time,
// min_req_local_aps,
// min_req_local_eng,
// min_req_local_add_lang,
// min_req_local_math,******
// //   dates
// app_opening_date,
// app_closing_date,
// //   text
// note,
// hero_image,

// "Non-SADC Tuition Fee": "2X local fees\n ",
// "SADC Tuition Fee": " only local fees ",
// Minimum Requirementuirements (local)
// Minimum Requirementuirements (International)
// Levy
// Non - African Countries
// Online Class

// tbl.string('duration', 255);
// tbl.string('tuition_fee_local', 255);
// tbl.string('tuition_fee_int', 255);
// tbl.string('levy', 255);
// tbl.string('levy_non_african', 255);
// tbl.string('local_application_fee_online', 255);
// tbl.string('local_application_fee_paper', 255);
// tbl.string('international_application_fee_online', 255);
// tbl.string('international_application_fee_paper', 255);
// tbl.string('study_mode_full_time', 255);
// tbl.string('study_mode_part_time', 255);
// tbl.string('min_req_local_aps', 255);
// tbl.string('min_req_local_english', 255);
// tbl.string('min_req_local_additional_lang', 255);
// tbl.string('min_req_local_mathematics', 255);
// tbl.string('min_req_international', 255);
// tbl.date('application_opening_date');
// tbl.date('application_closing_date');
// tbl.date('online_classes');
// tbl.text('note');
// tbl.text('hero_image');
