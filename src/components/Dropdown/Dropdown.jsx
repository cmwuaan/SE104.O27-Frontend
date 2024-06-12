import { useState } from 'react';
import PropTypes from 'prop-types';

function Dropdown({ children, menuItems }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return <p>{children}</p>;
}

Dropdown.propTypes = {
  menuItems: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default Dropdown;
