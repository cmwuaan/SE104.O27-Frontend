import { useState } from 'react';

const usePostData = () => {
  const [userData, setUserData] = useState({
    image_url: '',
    content: '',
    title: '',
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

export { usePostData };
