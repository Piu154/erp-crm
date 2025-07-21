// SignUpForm.jsx
import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function SignUpForm() {
  const translate = useLanguage();

  return (
    <>
    <Form.Item
  label="Name"
  name="name"
  rules={[{ required: true, message: 'Name is required' }]}
>
  <Input
    prefix={<UserOutlined className="site-form-item-icon" />}
    placeholder="Enter your name"
    size="large"
  />
</Form.Item>

      <Form.Item
        label={translate('email')}
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Enter a valid email' },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="yourname@example.com"
          type="email"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label={translate('password')}
        name="password"
        rules={[
          { required: true, message: 'Password is required' },
          { min: 6, message: 'Password must be at least 6 characters' },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Enter password"
          size="large"
        />
      </Form.Item>

      <Form.Item
  label="Re-enter Password"
  name="reEnterPassword" // <-- updated here
  dependencies={['password']}
  hasFeedback
  rules={[
    { required: true, message: 'Please confirm your password' },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('Passwords do not match');
      },
    }),
  ]}
>
  <Input.Password
    prefix={<LockOutlined className="site-form-item-icon" />}
    placeholder="Re-enter password"
    size="large"
  />
</Form.Item>

    </>
  );
}
