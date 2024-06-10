import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ForgotPassword />} />
          {/* <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
