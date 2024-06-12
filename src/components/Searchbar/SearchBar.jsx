import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // Call the onSearch function with the updated search term
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center border border-neutral-300 rounded-full px-2">
      <FaSearch className="text-gray-500 ml-2" />
      <input
        type="text"
        className="w-[400px] outline-none border-none focus:ring-0 bg-transparent"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
