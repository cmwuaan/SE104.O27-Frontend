import PropTypes from 'prop-types';

const BackgroundImage = ({ imageUrl, className, children }) => {
  return (
    <div
      className={`h-screen bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {children}
    </div>
  );
};

BackgroundImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default BackgroundImage;
