import { useState } from 'react';

const useDeviceData = () => {
  const [deviceData, setDeviceData] = useState({
    ip: '',
    air_val: '',
    left_status: '',
    right_status: '',
    status: '',
  });

  const handleDeviceChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const { checked } = event.target;
      setDeviceData((prevDetails) => ({
        ...prevDetails,
        [name]: checked,
      }));
    } else if (type === 'radio') {
      const array = [value];
      setDeviceData((prevDetails) => ({
        ...prevDetails,
        [name]: array,
      }));
    } else {
      setDeviceData((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  return { deviceData, handleDeviceChange, setDeviceData };
};

export { useDeviceData };
