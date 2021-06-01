import { apiWithoutToken } from './axiosInterceptor';

const request = {
  getAllCourses: (data) => {
    let method = 'get';
    let url = '/courses';
    return apiWithoutToken({
      method,
      url,
    });
  },
  updateCourseById: ({ id, data }) => {
    let method = 'put';
    let url = '/course/' + id;
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
  addCourse: (data) => {
    let method = 'post';
    let url = '/course';
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
};

export default request;
