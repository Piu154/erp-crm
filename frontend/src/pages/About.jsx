import { Button, Result } from 'antd';
import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();

  return (
    <Result
      status="info"
      title={'AdminiqERP'}
      subTitle={translate('Manage your business smarter with AdminiqERP.')}
      extra={
        <>
          <p>
            Website : <a href="#">(coming soon)</a>
          </p>
          <p>
            GitHub : <a href="#">(repository link coming soon)</a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open('#');
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
