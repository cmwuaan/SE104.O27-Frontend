import React, {useState, useRef, useEffect} from 'react'

function Dropdown_box({label, options, onSelect}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // click on a option handler
  const onOptionClicked = value => {
    setSelectedOption(value);
    onSelect(value);
    setIsOpen(false);
  };

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer text-gray-700 border border-gray-300 rounded shadow-sm px-4 py-2 bg-white" onClick={toggleDropdown}>
        {selectedOption || label}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg max-h-40 overflow-auto">
          {options.map(option => (
            <li key={option} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onOptionClicked(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown_box
