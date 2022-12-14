import PropTypes from 'prop-types';

function SearchBar({
  type, placeholder, onChange, className,
}) {
  const handleChange = (e) => (onChange(e.target.value));
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={handleChange}
    />
  );
}
SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
export default SearchBar;
