import { Button, Result, Modal, Typography, Space } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import useLanguage from '@/locale/useLanguage';

const { Title } = Typography;

const About = () => {
  const translate = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(null); // Track hovered item

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const getButtonStyle = (key) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    width: '100%',
    padding: '10px 16px',
    borderRadius: '8px',
    backgroundColor: hovered === key ? '#bae7ff' : '#e6f7ff',
    color: '#004b8d',
    fontWeight: 500,
    border: '1px solid #91d5ff',
    boxShadow: hovered === key ? '0 4px 12px rgba(0, 0, 0, 0.08)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  });

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  };

  const contactLinks = [
    {
      key: 'linkedin',
      icon: <LinkedinOutlined style={{ fontSize: 18, color: '#0077b5' }} />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/priya-samanta/',
    },
    {
      key: 'leetcode',
      icon: <CodeOutlined style={{ fontSize: 18, color: '#f29111' }} />,
      label: 'LeetCode',
      url: 'https://leetcode.com/u/Priya154/',
    },
    {
      key: 'portfolio',
      icon: <GlobalOutlined style={{ fontSize: 18, color: '#1890ff' }} />,
      label: 'Portfolio',
      url: 'https://prifholioo.netlify.app/',
    },
    {
      key: 'github',
      icon: <GithubOutlined style={{ fontSize: 18 }} />,
      label: 'GitHub',
      url: 'https://github.com/Piu154',
    },
  ];

  return (
    <>
      <Result
        status="info"
        title="AdminiqERP"
        subTitle={translate('Manage your business smarter with AdminiqERP.')}
        extra={
          <>
            <p>
              Website:{' '}
              <a
                href="https://prifholioo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a
                href="https://github.com/Piu154/erp-crm"
                target="_blank"
                rel="noopener noreferrer"
              >
                repository link
              </a>
            </p>

            <Button type="primary" onClick={showModal}>
              {translate('Contact us')}
            </Button>
          </>
        }
      />

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={400}
        title={
          <Title level={4} style={{ marginBottom: 0, marginLeft: -6 }}>
            🌐 Connect with Me
          </Title>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '80%' }}>
          {contactLinks.map(({ key, icon, label, url }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={getButtonStyle(key)}>
                {icon}
                {label}
              </div>
            </a>
          ))}
        </Space>
      </Modal>
    </>
  );
};

export default About;
