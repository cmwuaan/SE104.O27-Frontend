import { useGetListRequest, useSendDeleteRequest } from '../../common/action';
import { Spinner } from 'flowbite-react';
import Table from 'rc-table';
import { format } from 'date-fns';
import Button from '../../components/Button/Button';
import { TbTrash } from 'react-icons/tb';
import { BiDotsHorizontal, BiEdit, BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import Classes from './Customer.module.css';
import { useState } from 'react';
import { Dialog } from '../../components/Dialog/Dialog';
import useDialog from '../../hooks/useDialog';

import { FiFilter, FiPlus } from 'react-icons/fi';
import { PiExport, PiTrash } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Searchbar/SearchBar';
import { TfiReload } from 'react-icons/tfi';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa6';
import { Menu, MenuItem } from '@mui/material';
import CustomerDetailPage from '../../pages/management/Customer/CustomerDetailPage';
import { render } from 'react-dom';

function Customer() {
  const { data, error, isLoading } = useGetListRequest('/users');
  const [selectedIds, setSelectedIds] = useState([]);
  const { trigger: deleteTrigger, isMutating: isDeleting } = useSendDeleteRequest('/users', selectedIds, 'ids');
  const { visible, recordIds, closeDialog: onCloseDeleteDialog, openDialog: onOpenConfirmDeleteDialog } = useDialog();

  const [filteredData, setFilteredData] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleSelect = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const navigate = useNavigate();

  const onClickRemove = (record) => {
    setSelectedIds([]);
    onOpenConfirmDeleteDialog([...recordIds, record.id]);
  };

  const onClickEdit = (record) => {
    navigate(`/user/${record.id}/edit`);
  };

  const onConfirmDelete = async () => {
    await deleteTrigger();
    onCloseDeleteDialog();
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.data.map((item) => item.id));
    }
  };

  const handleAdd = () => {
    navigate('/user/create');
  };

  const handleExport = () => {
    console.log('Export');
  };

  const handleDeleteAll = () => {
    console.log(selectedIds);
    onOpenConfirmDeleteDialog(selectedIds);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm && !selectedRole) {
      setFilteredData(null);
    } else {
      let filtered = data.data;
      if (searchTerm) {
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (selectedRole) {
        filtered = filtered.filter((item) => item.role[0].toLowerCase() === selectedRole.toLowerCase());
      }
      setFilteredData(filtered);
    }
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    handleSearch(role);
  };

  const handleReload = () => {
    window.location.reload();
  };

  console.log(data?.data);

  const columns = [
    {
      title: (
        <div className={Classes.CheckboxWrapper}>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-secondary border-gray-300 rounded focus:ring focus:ring-secondary focus:ring-opacity-50"
            checked={selectedIds.length === data?.data.length}
            onChange={handleSelectAll}
          />
        </div>
      ),
      key: 'action-icon',
      width: 60,
      fixed: 'left',
      className: Classes.FixedTableCell,
      render(record) {
        return (
          <div className={Classes.CheckboxWrapper}>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-secondary border-gray-300 rounded focus:ring focus:ring-secondary focus:ring-opacity-50"
              checked={selectedIds.includes(record.id)}
              onChange={() => handleCheckboxChange(record.id)}
            />
          </div>
        );
      },
    },
    {
      title: <span className="flex">Name</span>,
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (record, value) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={value.avatar_url || 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'}
              alt={record}
              className="w-8 h-8 rounded-full"
            />
            <span>{record}</span>
          </div>
        );
      },
    },
    {
      title: <span className="flex">Email</span>,
      dataIndex: 'email',
      key: 'email',
      width: 250,
    },
    {
      title: <span className="flex">Phone</span>,
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 160,
      render: (record) => {
        if (record === null) return <p>--</p>;
        return <p>{record}</p>;
      },
    },
    {
      title: <span className="flex">Role</span>,
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (record) => {
        return record[0].charAt(0).toUpperCase() + record[0].slice(1);
      },
    },
    {
      title: <span className="flex">Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (record) => {
        if (record === null) return <p>--</p>;
        return <p>{record}</p>;
      },
    },
    {
      title: <span className="flex">Created At</span>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (record) => {
        return format(new Date(record), 'dd/MM/yyyy');
      },
    },
    {
      title: <span className="flex">Updated At</span>,
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (record) => {
        return format(new Date(record), 'dd/MM/yyyy');
      },
    },
    {
      title: <span className="flex">Actions</span>,
      dataIndex: '',
      key: 'actions',
      fixed: 'right',
      render: (record) => {
        return (
          <div className="flex gap-2">
            <Button className="bg-red-700 p-2 rounded" onClick={() => onClickRemove(record)}>
              <TbTrash className="text-white" />
            </Button>
            <Button className="bg-base-outline p-2 rounded" onClick={() => onClickEdit(record)}>
              <BiEdit className="text-white" />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <button
          disabled={selectedIds.length === 0}
          onClick={handleDeleteAll}
          className={`${
            selectedIds.length === 0 ? 'bg-neutral-300 text-neutral-400' : 'bg-red-700 hover:bg-red-600'
          } flex justify-center items-center gap-2 rounded h-fit py-2 px-4 text-sm text-white`}
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

      <div className="border border-neutral-200 h-fit w-full rounded">
        <div className="flex justify-between items-center m-4 h-full">
          <SearchBar onSearch={handleSearch} />
          <div className="flex gap-2 items-center h-full">
            <p className="text-sm">Showing 1 - 10 of 64 results</p>
            <TfiReload className="hover:cursor-pointer" onClick={handleReload} />
            {/* <FiChevronLeft />
            <FiChevronRight /> */}

            {/* Dropdown for Role Filter */}
            <div className="relative">
              <button
                onClick={handleSelect}
                className="flex justify-center items-center gap-2 border border-neutral-300 rounded h-fit py-2 px-4 text-sm hover:bg-neutral-100"
              >
                <FiFilter className="" />
                Filter
                <FaChevronDown className="text-sm" />
              </button>
              {/* <ul className="absolute hidden z-10 left-0 mt-2 py-1 bg-white border border-gray-200 rounded shadow-lg">
                <li>
                  <button
                    onClick={() => handleRoleFilter('admin')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleRoleFilter('customer')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Customer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleRoleFilter('staff')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Customer
                  </button>
                </li> */}
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <MenuItem onClick={() => handleRoleFilter('admin')}>Admin</MenuItem>
                <MenuItem onClick={() => handleRoleFilter('customer')}>Customer</MenuItem>
                <MenuItem onClick={() => handleRoleFilter('staff')}>Staff</MenuItem>
              </Menu>
              {/* Add more role buttons as needed */}
              {/* </ul> */}
            </div>
            {/* End of Dropdown */}
            {/* <button
              onClick={handleExport}
              className="flex justify-center items-center gap-2 border border-neutral-300 rounded py-3 px-3 text-sm hover:bg-neutral-100"
            >
              <BiDotsHorizontal className="" />
            </button> */}
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center h-[650px]">
            <Spinner className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary" />
          </div>
        )}
        {error && <p>{error.response.data.error}</p>}
        {data && (
          <>
            <Table
              tableLayout="fixed"
              className={Classes.TableWrapper}
              columns={columns}
              data={filteredData || data.data || 'No data'}
            />
          </>
        )}
        <Dialog
          isLoading={isDeleting}
          isOpen={visible}
          onClose={onCloseDeleteDialog}
          onConfirm={onConfirmDelete}
          content={
            <>
              <p>Are you sure you want to delete the selected items?</p>
            </>
          }
        />
      </div>
    </>
  );
}

export default Customer;
