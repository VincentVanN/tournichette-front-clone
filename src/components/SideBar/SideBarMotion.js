/* eslint-disable no-mixed-operators */
import './sideBarMotion.scss';
import { motion, useCycle } from 'framer-motion';
import MenuToggle from './MenuToggle';
import Navigation from './Navigation';

function SideBarMotion() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(30px at 40px 40px)',
      y: 0,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };
  return (
    <motion.nav
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      custom="100%"
      className="motionNavigation"
    >
      <motion.div className="navbar" variants={sidebar} />
      <Navigation toggle={toggleOpen} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}

export default SideBarMotion;
