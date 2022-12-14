import { useLocation, useNavigate } from 'react-router-dom';
import './accountConfirmation.scss';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

function AccountConfirmation() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const checked = query.get('checked');
  useEffect(() => {
    const timerToRedirection = setTimeout(() => {
      navigate('/');
    }, 4000);
    return () => clearTimeout(timerToRedirection);
  }, []);
  const getMessage = () => {
    if (checked === 'expired') {
      return 'Le lien de validation est périmé, un autre vient de t\'être envoyé sur ta boite mail';
    }
    if (checked === 'not-found') {
      return 'utilisateur non trouvé';
    }
    if (checked === 'already') {
      return 'Ton email a déjà été validé';
    }
    if (checked === 'checked') {
      return 'Ton email a été validé avec succès';
    }
    return 'Une erreur est survenue, contacte l\'administrateur';
  };
  return (
    <div className="accountConfirmation-container">
      <motion.div
        className="accountConfirmation"
        onClick={handleClick}
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
      >
        <div
          className="accountConfirmation-title"
        >{getMessage()}
        </div>
        <div
          className="accountConfirmation-content"
        >
          Retour sur la page de connexion
        </div>
        <ion-icon name="arrow-forward-circle-outline" size="large" />
      </motion.div>
    </div>
  );
}

export default AccountConfirmation;
