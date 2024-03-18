import '../styles/Signin.css';

function Signin() {
  return (
    <div className='w-150 h-auto bg-primary-40/80 text-cool-gray-90 rounded-0xl p-20'>
      <from action="">
        <img src="src/assets/LogoImage.svg" alt='logo' className='w-25 block m-auto'></img>
        <h2 className='text-heading-2 font-heading text-center cursor-default'>Welcome Back</h2>
        <p className='text-body-L font-body text-center cursor-default'>Please log in to continue</p>
        <div className='w-full mt-6'>
          <p className='text-body-S font-body cursor-default'>Email Address</p>
          <input type="text" placeholder='Email Address' required className='w-full h-10 rounded-md mt-2 placeholder-cool-gray-60 placeholder:p-4 placeholder:text-body-M'/>
          <p className='mt-5 text-body-S font-body cursor-default'>Password</p>
          <input type="password" placeholder='Password' required  className='w-full h-10 mt-2 placeholder-cool-gray-60 placeholder:p-4 placeholder:text-body-M'/>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <input type='checkbox' className='w-4 h-4'/>
            <label className='ml-1 text-body-S font-body'>Remember me</label>
          </div>
          <a href="#" className='text-primary-90 text-body-S font-body no-underline hover:underline'>Forgot Password?</a>
        </div>
        <div className='mt-5 bg-primary-90 rounded-md'>
          <button type='submit' className='w-full h-10 text-default-white text-body-M'>Log In</button>
        </div>
        <hr className='mt-6 divide-solid'/>
        <div className='mt-6 text-primary-90'>
          <p className='text-body-S font-body text-center mt-6'>No account yet? <a href="#" className='text-body-S font-body no-underline hover:underline'>Sign Up</a></p>
        </div>
      </from>
    </div>
  )
}

export default Signin;
