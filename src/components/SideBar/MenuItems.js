import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../feature/user.slice';

function MenuItems({
  toggle, id, text, path,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
  };
  const handleClick = () => {
    if (text === 'Déconnexion') {
      handleLogout();
    }
    toggle();
  };
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  const colors = ['#fef6e4'];
  const style = { border: `3px solid ${colors[0]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      className="navigationMotionListItem"
      onClick={handleClick}
    >
      <NavLink
        to={path}
        className="text-placeholder"
        style={style}
      >
        <span className="navigationText">{text}</span>
      </NavLink>
    </motion.li>
  );
}
MenuItems.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};
export default MenuItems;
