import PropTypes from 'prop-types';

function TextField({ label, type, name, placeholder = '', required = false }) {
  return (
    <label className="text-[0.6rem] flex flex-col w-full gap-1 mb-3" htmlFor={name}>
      {label}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className="text-[0.7rem] p-[6px] rounded-sm focus:outline-primary-100"
        required={required}
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
};

export default TextField;
