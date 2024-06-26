import React, { useState, useMemo } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './TableData.module.css';

function TableData({ type, data }) {
    const [selected, setSelected] = useState([]);
    const [showPassword, setShowPassword] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const getColumnsForType = (type) => {
        let column = [];
        if (type === 'admin' || type === 'staff' || type === 'customer') {
            if (type === 'admin') {
                column.push({field: 'id', headerName: 'Admin id', width: '15%'})
            } else if (type === 'staff') {
                column.push({field: 'id', headerName: 'Staff id', width: '15%'})
            } else if (type === 'customer') {
                column.push({field: 'id', headerName: 'Customer id', width: '15%'})
            }
            column.push(
                {field: 'name', headerName: 'Name', width: '20%'},
                {field: 'email', headerName: 'Email', width: '20%'},
                {field: 'username', headerName: 'Username', width: '20%'},
                {field: 'password', headerName: 'Password', width: '15%'},
                {field: 'role', headerName: 'Role', width: '10%'}
            )
        } else if (type === 'vehicle') {
            return [
                { field: 'id', headerName: 'Vehicle ID', width: '15%' },
                { field: 'driver', headerName: 'Driver', width: '20%' },
                { field: 'license', headerName: 'License', width: '15%' },
                { field: 'status', headerName: 'Status', width: '15%' },
                { field: 'location', headerName: 'Location', width: '20%' },
                { field: 'start_time', headerName: 'Start Time', width: '15%' }
            ];
        }
        return column;
    }

    const columns = getColumnsForType(type);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const toggleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelected(data.map(item => item.id));
        } else {
            setSelected([]);
        }
    };

    const toggleSelect = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const togglePasswordVisibility = (id) => {
        setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const customColumns = columns.map(column => {
        if (column.field === 'id') {
            return {
                ...column,
                render: item => (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selected.includes(item.id)}
                            onChange={() => toggleSelect(item.id)}
                        />
                        <span>{item.id}</span>
                    </div>
                )
            };
        } else if (column.field === 'name') {
            return {
                ...column,
                render: item => (
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                        <img src={item.avatarUrl || 'src/assets/logo/logo.svg'} alt={item.name} className="h-8 w-8 rounded-full" /> 
                        <span >{item.name}</span>
                    </div>
                )
            };
        } else if (column.field === 'password') {
            return {
                ...column,
                render: item => (
                    <div className='flex justify-between items-center w-full'>
                        <span>{showPassword[item.id] ? item.password : '*'.repeat(item.password.length)}</span>
                        <button onClick={() => togglePasswordVisibility(item.id)}>
                            {showPassword[item.id] ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                )
            };
        }
        return column;
    });
    
    return (
        <div>
            <table className="w-full">
                <thead className="bg-primary-30">
                    <tr>
                        {customColumns.map((column, index) => (
                            <th style={{ width: column.width }}
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                                <div className='flex items-center space-x-2'>
                                    {column.field === 'id' &&
                                        <input
                                            type="checkbox"
                                            checked={selected.length === data.length && data.length > 0}
                                            onChange={e => toggleSelectAll(e.target.checked)}
                                        />
                                    }
                                    <span>{column.headerName}</span>
                                    <button onClick={() => requestSort(column.field)}>
                                        {sortConfig.key === column.field ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '⇵'}
                                    </button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map((item, index) => (
                        <tr key={index}>
                            {customColumns.map((column) => (
                                <td style={{ width: column.width }} key={column.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <span >{column.render ? column.render(item) : item[column.field]}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableData;