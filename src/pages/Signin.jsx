import Background from '../assets/images/background.png';
import BackgroundImage from '../components/BackgroundImage';
import Form from '../components/Form';

const SignIn = () => {
  return (
    <div className="relative">
      <BackgroundImage imageUrl={Background} className={'flex items-center justify-center'}>
        <Form heading={'Welcome Back'} subHeading={'Please log in to continue'} />
      </BackgroundImage>
    </div>
  );
};

export default SignIn;
