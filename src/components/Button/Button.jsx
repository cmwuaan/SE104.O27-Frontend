import PropTypes from 'prop-types';
import Classes from './Button.module.css';

function Button({ children, onClick, ...props }) {
  return (
    <button className={Classes.Button} onClick={onClick} {...props}>
      <span>{props.icon || null}</span>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.element,
  children: PropTypes.node,
};

export default Button;
