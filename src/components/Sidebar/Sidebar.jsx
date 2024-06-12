import React, { useEffect } from 'react';
import Classes from './Sidebar.module.css';
import { BiHome } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import { SiStaffbase } from 'react-icons/si';
import { TiUserOutline } from 'react-icons/ti';
import { BsDeviceSsd } from 'react-icons/bs';
import { MdOutlineFeedback } from 'react-icons/md';
import { TbCalendar, TbMap, TbReport, TbTruck } from 'react-icons/tb';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { FaPage4 } from 'react-icons/fa6';
import { GoHome } from 'react-icons/go';
import { BsPostcard } from 'react-icons/bs';

const navItems = [
  // {
  //   title: 'Dashboard',
  //   path: '/dashboard',
  //   icon: <BiHome />,
  // },
  // {
  //   title: 'Admin Management',
  //   path: '/admin',
  //   icon: <RiAdminLine />,
  // },
  // {
  //   title: 'Staff Management',
  //   path: '/staff',
  //   icon: <SiStaffbase />,
  // },
  // {
  //   title: 'Customer Management',
  //   path: '/customer',
  //   icon: <TiUserOutline />,
  // },
  {
    title: 'User Management',
    path: '/user',
    icon: <TiUserOutline />,
  },
  {
    title: 'Post Management',
    path: '/post',
    icon: <BsPostcard />,
  },
  {
    title: 'Device Management',
    path: '/device',
    icon: <BsDeviceSsd />,
  },
  {
    title: 'Home Management',
    path: '/home',
    icon: <GoHome />,
  },
  {
    title: 'Vehicle Management',
    path: '/vehicle',
    icon: <TbTruck />,
  },
  {
    title: 'Location Management',
    path: '/location',
    icon: <TbMap />,
  },
  {
    title: 'Schedule',
    path: '/schedule',
    icon: <TbCalendar />,
  },
  {
    title: 'Feedback',
    path: '/feedback',
    icon: <MdOutlineFeedback />,
  },
  {
    title: 'Report',
    path: '/report',
    icon: <TbReport />,
  },
];
function Sidebar() {
  const { pathname } = useLocation();
  const [active, setActive] = React.useState('');
  const [isCollapse, setIsCollapse] = React.useState(false);
  const navigate = useNavigate();

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <aside className={isCollapse ? Classes.SidebarMobile : Classes.SidebarDesktop}>
      <Link className={Classes.Logo} to="/dashboard">
        <img src={Logo} alt="logo" className={Classes.LogoImage} />
        {!isCollapse && <h1 className={Classes.LogoTitle}>EcoSync</h1>}
      </Link>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className={`${Classes.SidebarItem} ${active === item.path.substring(1) ? Classes.Active : ''}`}
            >
              <span className={Classes.Icon}>{item.icon}</span>
              {!isCollapse && <span>{item.title}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
