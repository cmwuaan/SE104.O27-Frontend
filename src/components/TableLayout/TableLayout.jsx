import { Outlet } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import { PiExport, PiTrash } from 'react-icons/pi';

function TableLayout() {
  const handleAdd = () => {
    console.log('Add');
  };

  const handleExport = () => {
    console.log('Export');
  };

  const handleDeleteAll = () => {};
  return (
    <div className="h-full p-4">
      {/* <div className="flex justify-between">
        <button
          disabled={true}
          onClick={handleDeleteAll}
          className="flex justify-center items-center gap-2 bg-red-700 rounded h-fit py-2 px-4 text-sm text-white hover:bg-red-600"
        >
          <PiTrash className="" />
          Delete All
        </button>
        <div className="flex flex-row-reverse gap-4 mb-4">
          <button
            onClick={handleExport}
            className="flex justify-center items-center gap-2 border border-neutral-300 rounded h-fit py-2 px-4 text-sm hover:bg-neutral-100"
          >
            <PiExport className="" />
            Export
          </button>
          <button
            onClick={handleAdd}
            className="flex justify-center items-center gap-2 bg-primary border border-base-outline rounded h-fit py-2 px-4 text-sm hover:bg-secondary"
          >
            <FiPlus className="" />
            Add
          </button>
        </div>
      </div>
      <Outlet /> */}
      <Outlet />
    </div>
  );
}

export default TableLayout;
