import PropTypes from 'prop-types';

function Button({ title, onClick }) {
  return (
    <button
      className="w-full bg-primary-color text-white text-[0.7rem] p-[6px] font-medium rounded-sm"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
