import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Classes from './MainLayout.module.css';
import Navbar from '../Navbar/Navbar';
const MainLayout = () => {
  return (
    <>
      <div className={Classes.Background}>
        <Sidebar />
        <div className={Classes.Content}>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
