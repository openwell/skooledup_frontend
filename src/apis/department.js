import { apiWithoutToken } from './axiosInterceptor';

const request = {
  getDepartments: (data) => {
    let method = 'get';
    let url = '/departments';
    return apiWithoutToken({
      method,
      url,
    });
  },
  getDepartmentsByFacultyId: ({ faculty_id }) => {
    let method = 'get';
    let url = '/departmentsByFacultyId/' + faculty_id;
    return apiWithoutToken({
      method,
      url,
    });
  },
  updateDepartmentById: ({ id, data }) => {
    let method = 'put';
    let url = '/department/' + id;
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
  addDepartment: (data) => {
    let method = 'post';
    let url = '/department';
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
};

export default request;
