import { useState } from 'react';

const useDialog = () => {
  const [visible, setVisible] = useState(false);
  const [recordIds, setRecordIds] = useState([]);

  const openDialog = (recordIds) => {
    console.log('recordIds', recordIds);
    setRecordIds(recordIds);
    setVisible(true);
  };

  const closeDialog = () => {
    setRecordIds([]);
    setVisible(false);
  };

  return {
    visible,
    recordIds,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
