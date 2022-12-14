import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import MenuItems from './MenuItems';

function Navigation({ toggle }) {
  const variants = {
    open: {
      x: 0,
      transition: {
        staggerChildren: 0.07, delayChildren: 0.2, zIndex: 25,
      },
    },
    closed: {
      x: -300,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const Items = [
    { id: '0', text: 'Accueil', path: '/' },
    { id: '1', text: 'Profil', path: '/profil' },
    { id: '2', text: 'Paniers', path: '/NosPaniers' },
    { id: '3', text: 'Au détail', path: '/liste' },
    { id: '4', text: 'Tes Achats', path: '/MesAchats' },
    { id: '5', text: 'Déconnexion', path: '/' },
  ];

  return (
    <motion.ul className="navigationList" variants={variants}>
      {Items.map((item) => (
        <MenuItems toggle={toggle} id={item.id} key={item.id} text={item.text} path={item.path} />
      ))}
    </motion.ul>
  );
}
Navigation.propTypes = {
  toggle: PropTypes.func.isRequired,
};
export default Navigation;
