import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';

function App() {
  return (
    <main className="">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/" element={<Signin />} /> */}
      </Routes>
    </main>
  );
}

export default App;
