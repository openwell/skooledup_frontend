import { apiWithoutToken } from './axiosInterceptor';

const request = {
  getAllDegrees: (data) => {
    let method = 'get';
    let url = '/degrees';
    return apiWithoutToken({
      method,
      url,
    });
  },
  updateDegreeById: ({ id, data }) => {
    let method = 'put';
    let url = '/degree/' + id;
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
  addDegree: (data) => {
    let method = 'post';
    let url = '/degree';
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
};

export default request;
