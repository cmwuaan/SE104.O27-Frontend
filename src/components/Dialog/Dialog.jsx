import Button from '../../components/Button/Button'; // Assuming you have a reusable Button component
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon from react-icons

const Dialog = ({ isOpen, onClose, onConfirm, content, isLoading, footer }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded p-4 shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none flex justify-end">
          <AiOutlineClose className="h-6 w-6" />
        </button>
        <div className="mb-4">{content}</div>
        {footer || (
          <div className="flex justify-end gap-2">
            <Button className="bg-gray-500 text-white p-2 rounded" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-red-700 text-white p-2 rounded" onClick={onConfirm} disabled={isLoading}>
              Confirm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Dialog };
