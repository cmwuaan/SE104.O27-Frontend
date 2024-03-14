import Background from '../assets/images/background.png';
import BackgroundImage from '../components/BackgroundImage';
import SigninForm from '../components/SigninForm';

const SignIn = () => {
  return (
    <div className="relative">
      <BackgroundImage imageUrl={Background}>
        <SigninForm />
      </BackgroundImage>
    </div>
  );
};

export default SignIn;
