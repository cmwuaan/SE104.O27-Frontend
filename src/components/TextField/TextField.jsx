import PropTypes from 'prop-types';
import Classes from './TextField.module.css';

function TextField({ label, type, name, placeholder = '', required = false, onChange, value }) {
  return (
    <label className={Classes.Label} htmlFor={name}>
      {label}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={Classes.Input}
        required={required}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </label>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
