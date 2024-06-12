import { useContext } from 'react';
import Background from '../assets/images/background.png';
import BackgroundImage from '../components/BackgroundImage/BackgroundImage';
import FormFactory from '../components/FormFactory/FormFactory';
import { UserContext } from '../context/userContext';

const Login = () => {
  const { user, login } = useContext(UserContext);

  if (user.auth) window.location.href = '/';

  const handleSubmit = (data) => {
    const user = data.user;
    if (user.role[0] !== 'admin') {
      return alert('You are not authorized to access this page');
    }
    login(data.user);
  };
  return (
    <div className="relative">
      <BackgroundImage imageUrl={Background} className={'flex items-center justify-center'}>
        <FormFactory
          formType="login"
          heading={'Login'}
          subHeading={'Please log in to continue'}
          handleResponse={handleSubmit}
        />
      </BackgroundImage>
    </div>
  );
};

export default Login;
