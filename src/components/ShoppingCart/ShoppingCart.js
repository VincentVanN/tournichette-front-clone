import './shoppingCart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card/Card';
import ChoiseDepotPoints from '../ChoiseDepotPoints/ChoiseDepotPoints';
import ShoppingCartEmpty from './ShoppingCartEmpty';
import { deleteShoppingCart } from '../../feature/shoppingCart.slice';
import Button from '../Button/Button';
import { setButtonText, setCartOpening, setNavigationMessage, setShowModal } from '../../feature/navigation.slice';

function ShoppingCart() {
  const cartToDisplay = useSelector((state) => state.shoppingCart.shoppingCart);
  const { width, cartOpening } = useSelector((state) => state.navigation);
  const dispatch = useDispatch();
  //
  const [isAdressMenu, setIsAdressMenu] = useState(false);
  const handleClickAdressMenu = () => setIsAdressMenu(!isAdressMenu);
  const handleDeleteCart = () => dispatch(deleteShoppingCart());
  //
  //
  // get amount of order
  const cartAmount = useSelector((state) => state.shoppingCart.cartAmount);
  useEffect(() => {
    if (cartOpening && cartToDisplay.length !== 0) {
      dispatch(setNavigationMessage('Pour la démonstration, le serveur de paiement Stripe a été désactivé'));
      dispatch(setButtonText('Valider'));
      dispatch(setShowModal(true));
      dispatch(setCartOpening(false));
    }
  }, [cartOpening, cartToDisplay]);
  if (cartToDisplay.length === 0) {
    return (
      <ShoppingCartEmpty />
    );
  }
  if (cartToDisplay.length !== 0) {
    return (
      <div className="shoppingCart">
        {!isAdressMenu && (
          <div className="shoppingCart-container">
            <div className="shoppingCart-header">
              <div className="shoppingCart-title">
                <div className="shoppingCart-shoppingCartAmont">
                  <div className="cart-icon">
                    <ion-icon name="cart-outline" style={{ fontSize: '50px', padding: '5px' }} />
                  </div>
                  <div
                    className="cart-amount"
                  >
                    <span>Total</span>
                    <motion.div
                      className="amount"
                      key={cartAmount}
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                        transition: {
                          duration: 0.1, type: 'spring', damping: 10, stiffness: 500,
                        },
                      }}
                    >
                      {` ${cartAmount}€`}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="shoppingCart-list">
              {cartToDisplay.map((product) => (
                <Card
                  related="shoppingCart"
                  key={product.name}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  unity={product.unity}
                  quantity={product.quantity}
                  slug={product.slug}
                  product={product}
                  id={product.id}
                />
              ))}
            </ul>
            <motion.div
              className="depotButtonsContainer"
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {width < 1024 && (
                <Button
                  icon="arrow-forward-circle-outline"
                  text="Valider"
                  onClick={handleClickAdressMenu}
                />
              )}
              <div
                className="choiseDepotButton-largeScreen"
                onClick={handleDeleteCart}
              >
                <Button text="Tout supprimer" icon="trash-outline" />
              </div>
            </motion.div>

          </div>
        )}
        {isAdressMenu && (<ChoiseDepotPoints />)}
      </div>
    );
  }
}

export default ShoppingCart;
