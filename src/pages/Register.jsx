import Background from '../assets/images/background.png';
import BackgroundImage from '../components/BackgroundImage/BackgroundImage';
import FormFactory from '../components/FormFactory/FormFactory';

const Register = () => {
  return (
    <div className="relative">
      <BackgroundImage imageUrl={Background} className={'flex items-center justify-center'}>
        <FormFactory formType="register" heading={'Register'} subHeading={'Create your account'} />
      </BackgroundImage>
    </div>
  );
};

export default Register;
