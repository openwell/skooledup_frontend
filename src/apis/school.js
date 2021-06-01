import { apiWithoutToken } from './axiosInterceptor';

const request = {
  getAllSchools: (data) => {
    let method = 'get';
    let url = '/schools';
    return apiWithoutToken({
      method,
      url,
      // params: { BVN: data },
    });
  },
  updateSchoolById: ({ id, data }) => {
    let method = 'put';
    let url = '/school/' + id;
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
  addSchool: (data) => {
    let method = 'post';
    let url = '/school';
    return apiWithoutToken({
      method,
      url,
      data,
    });
  },
};

export default request;
