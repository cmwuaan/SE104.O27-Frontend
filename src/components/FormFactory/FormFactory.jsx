import PropTypes from 'prop-types';
import Logo from '../../assets/logo/logo.svg';
import Button from '../Button/Button';
import Classes from './FormFactory.module.css';
import TextField from '../TextField/TextField';
import formConfigurations from '../../common/form.type';
import useForm from '../../hooks/useForm';
import useAuthentication from '../../hooks/useAuthentication';

FormFactory.propTypes = {
  formType: PropTypes.oneOf(['login', 'register']).isRequired,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  handleResponse: PropTypes.func,
};

function FormFactory({ formType, heading, subHeading, handleResponse }) {
  const initialValues = formConfigurations[formType];
  const { values, handleChange } = useForm(initialValues);
  const { authenticate, loading, error, setError } = useAuthentication(formType);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      const responseData = await authenticate(values);
      if (responseData.success) {
        handleResponse(responseData);
        setError(null);
      }
    } catch (err) {
      console.error(`${formType === 'login' ? 'Login' : 'Registration'} failed:`, err);
    }
  };

  return (
    <div className={Classes.FormBackground}>
      <form className={Classes.FormWrapper} onSubmit={onSubmit}>
        <img src={Logo} alt="logo" className={Classes.LogoImage} />
        <h2 className={Classes.Heading}>{heading}</h2>
        <p className={Classes.SubHeading}>{subHeading}</p>
        {formType === 'register' && (
          <TextField
            label="Full Name"
            placeholder="Full Name"
            name="name"
            type="text"
            value={values.fullName}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        )}
        <TextField
          label="Email Address"
          placeholder="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange(e)}
          required={true}
        />
        <TextField
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={(e) => handleChange(e)}
          required={true}
        />
        {formType === 'register' && (
          <TextField
            label="Confirm Password"
            placeholder="Confirm Password"
            name="password_confirmation"
            type="password"
            value={values.confirmPassword}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        )}
        {/* {formType === 'login' && (
          <div className={Classes.ButtonWrapper}>
            <label htmlFor="save-login" className={Classes.Label}>
              <input
                className={Classes.Checkbox}
                name="saveLogin"
                id="save-login"
                type="checkbox"
                checked={values.saveLogin}
                onChange={(e) => handleChange(e)}
              />
              <span className="text-[0.8rem]">Remember me</span>
            </label>
            <Link to={'/resetpassword'} className="hover:text-primary-90 text-[0.8rem]">
              Forgot password?
            </Link>
          </div>
        )} */}
        <div className={Classes.Divide}></div>
        {error && <p className={Classes.Error}>{error.response.data.error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : formType === 'login' ? 'Login' : 'Register'}
        </Button>

        {/* <p className={Classes.SubLink}>
          {formType === 'login' ? 'No account yet?' : 'Already have an account'}
          {formType === 'login' ? (
            <Link to={'/register'} className="hover:text-[#265902]">
              Sign Up
            </Link>
          ) : (
            <Link to={'/login'} className="hover:text-[#265902]">
              Sign In
            </Link>
          )}
        </p> */}
      </form>
    </div>
  );
}

export default FormFactory;
