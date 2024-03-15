import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../assets/logo/logo.svg';
import Button from './Button';
import styles from '../styles/Form.module.css';
import TextField from './TextField';

function SigninForm({ heading, subHeading }) {
  // Add propType validation for 'heading'
  SigninForm.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
  };
  return (
    <div className={styles.background_form}>
      <form className="flex flex-col justify-center items-center text-primary-color w-[80%]">
        <img src={Logo} alt="logo" className="h-[60px]" />
        <h2 className="text-2xl font-bold mt-1">{heading}</h2>
        <p className="text-xs mb-6">{subHeading}</p>
        <TextField label="Email Address" placeholder="Email Address" name="email" type="email" required={true} />
        <TextField label="Password" placeholder="Password" name="password" type="password" required={true} />
        <div className="flex text-[0.6rem] w-full justify-between mb-2">
          <label htmlFor="save-login" className="flex justify-center items-center gap-1">
            <input
              className="accent-primary-color focus:accent-primary-color"
              name="save-login"
              id="save-login"
              type="checkbox"
            />
            <span>Remember me</span>
          </label>
          <Link to={'/resetpassword'} className="hover:text-[#265902]">
            Forgot password?
          </Link>
        </div>
        <Button title="Log In" onClick={() => console.log('Hi')} />
        <div className="w-full bg-[#DDE1E6] h-[0.8px] mt-3"></div>
        <p className="flex gap-1 justify-center text-[0.6rem] mt-2">
          No account yet?{' '}
          <Link to={'/signup'} className="hover:text-[#265902]">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SigninForm;
