import { apiWithoutToken } from './axiosInterceptor';

const request = {
  getFaculties: () => {
    let method = 'get';
    let url = '/faculties';
    return apiWithoutToken({
      method,
      url,
    });
  },
  getFacultiesBySchoolId: ({ school_id }) => {
    let method = 'get';
    let url = '/facultiesBySchoolId/' + school_id;
    return apiWithoutToken({
      method,
      url,
    });
  },
  updateFacultyById: ({ id, data }) => {
    let method = 'put';
    let url = '/faculty/' + id;
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
  addFaculty: (data) => {
    let method = 'post';
    let url = '/faculty';
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
};

export default request;
