import { BiLogOut } from 'react-icons/bi';
import { FaUber } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';

export const accountDropdown = [
  {
    label: 'Profile',
    icon: <FaUber />,
    onClick: () => {
      window.location.pathname = '/profile';
    },
  },
  {
    label: 'Settings',
    icon: <FiSettings />,
    onClick: () => {
      window.location.pathname = '/setting';
    },
  },
  {
    label: 'Logout',
    icon: <BiLogOut />,
    onClick: () => {
      console.log('Logout');
    },
  },
];
