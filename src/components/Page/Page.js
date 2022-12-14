import PropTypes from 'prop-types';
// import SideBar from 'src/components/SideBar/SideBar';
import SideBarMotion from '../SideBar/SideBarMotion';

function Page({ children }) {
  return (
    <main>
      <SideBarMotion />
      {children}
    </main>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
