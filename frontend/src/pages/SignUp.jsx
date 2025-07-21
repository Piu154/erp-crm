import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLanguage from '@/locale/useLanguage';

import { Form, Button,message } from 'antd';
import { Link } from 'react-router-dom';
import { login, register } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';
import SignUpForm from '@/forms/SignUpForm';
import { signup } from '@/auth';

const SignUp = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  // const size = useSize();

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("🟡 Dispatching signup with →", values);
    const result = await dispatch(signup({ signupData: values }));
  
    console.log("🔥 Signup result →", result);
  
    if (result.success) {
      message.success("Signup successful!");
      navigate("/"); // or wherever you want
    } else {
      message.error(result.message || "Signup failed.");
    }
  };
  
  
  
  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <SignUpForm/>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              size="large"
            >
              {translate('Sign Up')}
            </Button>
              <Form.Item>
        {/* <button type="submit" className="ant-btn ant-btn-primary ant-btn-lg" style={{ width: '100%' }}>
          Sign Up
        </button> */}
      </Form.Item>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
          <span>{translate('Already have an account?')} </span>
          <Link to="/login">{translate('Sign in')}</Link>
        </div>
        </Form>
      </Loading>
    );
  };

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign Up" />;
};

export default SignUp; 