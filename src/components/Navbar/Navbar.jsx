import Classes from './Navbar.module.css';
import Logo from '../../assets/images/logo.png';
import { useContext, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { UserContext } from '../../context/userContext';
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout(user);
  };

  return (
    <div className={Classes.Navbar}>
      <div className={Classes.UserContainer}>
        <img src={Logo} alt="avatar" className={Classes.Avatar} onClick={handleClick} />
        <Menu
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
