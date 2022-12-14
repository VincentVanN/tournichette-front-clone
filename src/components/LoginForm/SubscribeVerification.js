import './subscribeVerification.scss';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

function SubscribeVerification() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  return (
    <div className="SubscribeVerification-container">
      <motion.div
        className="SubscribeVerification"
        onClick={handleClick}
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
      >
        <div
          className="SubscribeVerification-title"
        >Ton compte est créé! vérifie tes email pour le confirmer.
        </div>
        <div
          className="SubscribeVerification-content"
        >
          Retour sur la page de connexion
        </div>
        <ion-icon name="arrow-forward-circle-outline" size="large" />
      </motion.div>
    </div>
  );
}

export default SubscribeVerification;
