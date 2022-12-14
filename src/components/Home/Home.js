import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import logo from 'src/assets/logo.svg';
import './home.scss';
import { useSelector } from 'react-redux';
import Page from '../Page/Page';
import SocialNetwork from '../SocialNetwork/SocialNetwork';

function Home() {
  const navigate = useNavigate();
  const handleClickProducts = () => navigate('/liste');
  const handleClickCarts = () => navigate('/NosPaniers');
  const name = useSelector((state) => state.user.user.firstname);
  const width = useSelector((state) => state.navigation.width);
  return (
    <Page>
      <div className="home-container">
        <div className="home">
          <img className="home-logo" src={logo} alt="logo Tournichette" />
          <div className="home-annoncement">
            <div className="home-hello">
              {`Hello ${name}!`}
            </div>
            Les ventes sont ouvertes
          </div>
          <div className="home-button-group">
            <div
              className="home-button-container"
              onClick={handleClickCarts}
            >
              <h2 className="home-button-title">Mon panier de légumes</h2>
              <motion.button
                className="home-button"
                type="button"
                initial={{ x: 0 }}
                animate={{
                  x: [0, 90, 0],
                  rotate: [0, 360, 0],
                  transition: { duration: 1, delay: 0.2 },
                }}
              >
                <ion-icon name="arrow-forward-circle-outline" style={{ color: '#f88e6d', fontSize: '50px' }} />
              </motion.button>
            </div>
            <div
              className="home-button-container"
              onClick={handleClickProducts}
            >
              <h2 className="home-button-title"> Choisir au détail</h2>
              <motion.button
                className="home-button"
                type="button"
                initial={{ x: 0 }}
                animate={{
                  x: [0, 90, 0],
                  rotate: [0, 360, 0],
                  transition: { duration: 1, delay: 0.2 },
                }}
              >
                <ion-icon name="arrow-forward-circle-outline" style={{ color: '#f88e6d', fontSize: '50px' }} />
              </motion.button>
            </div>
          </div>
          <SocialNetwork widthDiv="30%" position={width > 560 ? '50px' : '20px'} />
        </div>
      </div>
    </Page>
  );
}
export default Home;
