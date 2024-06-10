import PropTypes from 'prop-types';

function Button({ children, onClick, ...props }) {
  return (
    <button
      className="flex justify-center w-full bg-primary-100 text-white text-[0.7rem] p-[6px] font-medium rounded-sm"
      onClick={onClick}
    >
      <span>{props.icon || null}</span>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  children: PropTypes.node,
};

export default Button;
