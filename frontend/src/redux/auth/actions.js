import * as actionTypes from './types';
import * as authService from '@/auth';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { request } from '@/request';
import axios from 'axios';



export const login = ({ loginData }) => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'login' }); // Include keyState

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    const { data } = response;

    dispatch({
      type: actionTypes.REQUEST_SUCCESS,
      keyState: 'login', // 👈 match with reducer key
      payload: data,
    });

    localStorage.removeItem('isLogout'); // Optional

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("❌ Login error:", error);

    dispatch({
      type: actionTypes.REQUEST_FAILED,
      keyState: 'login',
    });

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Login failed',
    };
  }
};





export const register =
  ({ registerData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.register({ registerData });

    if (data.success === true) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const verify =
  ({ userId, emailToken }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.verify({ userId, emailToken });

    if (data.success === true) {
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      };
      window.localStorage.setItem('auth', JSON.stringify(auth_state));
      window.localStorage.removeItem('isLogout');
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const resetPassword =
  ({ resetPasswordData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.resetPassword({ resetPasswordData });

    if (data.success === true) {
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      };
      window.localStorage.setItem('auth', JSON.stringify(auth_state));
      window.localStorage.removeItem('isLogout');
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  const result = window.localStorage.getItem('auth');
  const tmpAuth = JSON.parse(result);
  const settings = window.localStorage.getItem('settings');
  const tmpSettings = JSON.parse(settings);
  window.localStorage.removeItem('auth');
  window.localStorage.removeItem('settings');
  window.localStorage.setItem('isLogout', JSON.stringify({ isLogout: true }));
  const data = await authService.logout();
  if (data.success === false) {
    const auth_state = {
      current: tmpAuth,
      isLoggedIn: true,
      isLoading: false,
      isSuccess: true,
    };
    window.localStorage.setItem('auth', JSON.stringify(auth_state));
    window.localStorage.setItem('settings', JSON.stringify(tmpSettings));
    window.localStorage.removeItem('isLogout');
    dispatch({
      type: actionTypes.LOGOUT_FAILED,
      payload: data.result,
    });
  } else {
    // on lgout success
  }
};

export const updateProfile =
  ({ entity, jsonData }) =>
  async (dispatch) => {
    let data = await request.updateAndUpload({ entity, id: '', jsonData });

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      };
      window.localStorage.setItem('auth', JSON.stringify(auth_state));
    }
  };
  export const signup =
  ({ signupData }) =>
  async (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    console.log("🚀 Before calling signup API...");

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, signupData);
      console.log('✅ Response →', response);

      const data = response.data;
      console.log('📦 data →', data);

      if (data.success === true) {
        const auth_state = {
          current: data.data, // ✅ Using correct field
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };

        localStorage.setItem('auth', JSON.stringify(auth_state));

        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          payload: data.data,
        });

        dispatch({
          type: actionTypes.SIGNUP_SUCCESS,
          payload: data.data,
        });

        return data; // ✅ Return success here
      } else {
        dispatch({ type: actionTypes.REQUEST_FAILED });
        return data; // ✅ Return failure here
      }

    } catch (error) {
      console.error("❌ Signup failed", error);
      dispatch({ type: actionTypes.REQUEST_FAILED });
      return { success: false, message: error.message }; // ✅ Return catch error
    }
  };
