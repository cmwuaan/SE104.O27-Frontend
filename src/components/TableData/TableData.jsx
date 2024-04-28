import React, { useState, useMemo } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './TableData.module.css';

function TableData({ columns, data }) {
    const [selected, setSelected] = useState([]);
    const [showPassword, setShowPassword] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
                headerRender: () => (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selected.length === data.length && data.length > 0}
                            onChange={e => toggleSelectAll(e.target.checked)}
                        />
                        <span>{column.headerName}</span>
                    </div>
                ),
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
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider space-x-2 items-center"
                            >
                                <span>{column.headerRender ? column.headerRender() : column.headerName}</span>
                                <button onClick={() => requestSort(column.field)}>
                                    {sortConfig.key === column.field ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '⇵'}
                                </button>
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