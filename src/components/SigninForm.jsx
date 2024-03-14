import Logo from '../assets/logo/logo.svg';
import Button from './Button';
function SigninForm() {
  return (
    <div>
      <form>
        <img src={Logo} alt="logo" />
        <h2>Welcome Back</h2>
        <p>Please log in to continue</p>
        <div>
          <label htmlFor="email">Email Address</label>
          <input name="email" id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
        </div>
        <div>
          <div>
            <input name="save-login" id="save-login" type="checkbox" />
            <label htmlFor="save-login">Remember me</label>
          </div>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <Button />
      </form>
      <div></div>
      <p>
        No account yet? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default SigninForm;
