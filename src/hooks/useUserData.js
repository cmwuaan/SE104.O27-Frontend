import { useState } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: [],
    phone_number: '',
    avatar_url: '',
    status: false,
  });

  const handleUserChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const { checked } = event.target;
      setUserData((prevDetails) => ({
        ...prevDetails,
        [name]: checked,
      }));
    } else if (type === 'radio') {
      const array = [value];
      setUserData((prevDetails) => ({
        ...prevDetails,
        [name]: array,
      }));
    } else {
      setUserData((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  return { userData, handleUserChange, setUserData };
};

export { useUserData };
