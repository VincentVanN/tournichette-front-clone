import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

function ShoppingCartEmpty() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/liste');
  return (
    <div className="shoppingCart">
      <motion.div
        className="shoppingCart-empty"
        onClick={handleClick}
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
      >
        <div
          className="shoppingCart-empty-title"
        >Ton panier est vide
        </div>
        <div
          className="shoppingCart-empty-content"
        >
          pour tes courses c'est par ici!
        </div>
        <ion-icon name="arrow-forward-circle-outline" size="large" />
      </motion.div>
    </div>
  );
}

export default ShoppingCartEmpty;
