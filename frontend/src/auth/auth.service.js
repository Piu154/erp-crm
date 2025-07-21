import { API_BASE_URL } from '@/config/serverApiConfig';
import * as actionTypes from '../../src/redux/auth/types';
import axios from 'axios';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';
import { message } from 'antd';
export const login = async ({ loginData }) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `login?timestamp=${new Date().getTime()}`,
      loginData
    );

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

// export const register = async ({ registerData }) => {
//   try {
//     const response = await axios.post(API_BASE_URL + `register`, registerData);

//     const { status, data } = response;

//     successHandler(
//       { data, status },
//       {
//         notifyOnSuccess: true,
//         notifyOnFailed: true,
//       }
//     );
//     return data;
//   } catch (error) {
//     return errorHandler(error);
//   }
// };

export const verify = async ({ userId, emailToken }) => {
  try {
    const response = await axios.get(API_BASE_URL + `verify/${userId}/${emailToken}`);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const resetPassword = async ({ resetPasswordData }) => {
  try {
    const response = await axios.post(API_BASE_URL + `resetpassword`, resetPasswordData);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const logout = async () => {
  axios.defaults.withCredentials = true;
  try {
    // window.localStorage.clear();
    const response = await axios.post(API_BASE_URL + `logout?timestamp=${new Date().getTime()}`);
    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const signup = ({ signupData }) => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });

  try {
    const response = await axios.post(`${API_BASE_URL}signup`, signupData);

    // You can either:
    // A. dispatch REQUEST_SUCCESS if it logs them in immediately
    // B. dispatch REGISTER_SUCCESS if it just registers them (more common)

    dispatch({ type: actionTypes.REGISTER_SUCCESS });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    dispatch({ type: actionTypes.REQUEST_FAILED });

    return {
      success: false,
      message: error.response?.data?.message || 'Signup failed',
    };
  }
};