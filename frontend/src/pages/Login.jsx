import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLanguage from '@/locale/useLanguage';

import { Form, Button,message, Alert } from 'antd';

import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';
import { Link } from 'react-router-dom';
import {  isLoggedIn as selectIsLoggedIn } from '@/redux/auth/selectors';

const LoginPage = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess, current } = useSelector(selectAuth);
  console.log('Full current:', current);
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  

  const navigate = useNavigate();
  // const size = useSize();

  const dispatch = useDispatch();
  
  const onFinish = async (values) => {
    // console.log("📤 Submitting login values:", values);

    const result = await dispatch(login({ loginData: values }));
  
    // console.log("🔥 Login result →", result);
  
    if (result.success) {
      message.success("Login successful!");
    } else {
      message.error(result.message || "Invalid credentials");
    }
  };
  
  

  
  useEffect(() => {
    // console.log("Effect Triggered →", { isSuccess, isLoggedIn, current });
    if (isSuccess && isLoggedIn && current?.token) {
      navigate('/');
    }
  }, [isSuccess, isLoggedIn, current]);
  
  
  
  

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <div style={{ marginBottom: 16 }}>
          <Alert
            message="Use test credentials → Email: test@test.com | Password: Test@123"
            type="info"
            showIcon
            banner
          />
        </div>
  
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <LoginForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              size="large"
            >
              {translate('Log in')}
            </Button>
          </Form.Item>
  
          <div style={{ textAlign: 'center' }}>
            <span>{translate("Don't have an account?")} </span>
            <Link to="/signup">{translate('Sign up')}</Link>
          </div>
        </Form>
      </Loading>
    );
  };
  

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />;
};

export default LoginPage;
