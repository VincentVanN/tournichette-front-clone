import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import logo from 'src/assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './shoppingCartPaymentSuccess.scss';

import { getOrderHistory } from '../../AsyncChunk/AsyncChunkUser';

function ShoppingCartPaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickHome = () => navigate('/');
  const handleClickProfil = () => navigate('/profil');
  const name = useSelector((state) => state.user.user.firstname);
  const { state } = useLocation();
  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);
  return (
    <div className="ShoppingCartSuccess-container">
      <div className="ShoppingCartSuccess">
        <img className="ShoppingCartSuccess-logo" src={logo} alt="logo Tournichette" />
        <div className="ShoppingCartSuccess-annoncement">
          <div className="ShoppingCartSuccess-hello">
            {`Merci ${name}!`}
          </div>
          {!state || state.origin === 'creditCard' ? 'Paiement effectué!' : 'Commande enregistrée!'}
        </div>
        <div className="ShoppingCartSuccess-button-group">
          <div
            className="ShoppingCartSuccess-button-container"
            onClick={handleClickHome}
          >
            <h2 className="ShoppingCartSuccess-button-title">Retour à l'accueil</h2>
            <motion.button
              className="ShoppingCartSuccess-button"
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
            className="ShoppingCartSuccess-button-container"
            onClick={handleClickProfil}
          >
            <h2 className="ShoppingCartSuccess-button-title">Voir l'historique des commandes</h2>
            <motion.button
              className="ShoppingCartSuccess-button"
              type="button"
              initial={{ x: 0 }}
              animate={{
                x: [0, 90, 0],
                rotate: [0, 360, 0],
                transition: { duration: 1, delay: 0.2 },
              }}
              exit={{ x: 0 }}
            >
              <ion-icon name="arrow-forward-circle-outline" style={{ color: '#f88e6d', fontSize: '50px' }} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartPaymentSuccess;
