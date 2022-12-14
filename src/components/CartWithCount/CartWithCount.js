import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import './cartWithCount.scss';
import { changeQuantityProduct } from '../../utils/cartUtils';
import { pushInCart, setCount } from '../../feature/shoppingCart.slice';

function CartWithCount() {
  const countOfProducts = useSelector((state) => state.shoppingCart.count);
  const cartToDisplay = useSelector((state) => state.shoppingCart.shoppingCart);
  const cartAmount = useSelector((state) => state.shoppingCart.cartAmount);
  const navigate = useNavigate();
  const handleClick = () => navigate('/MesAchats');
  const dispatch = useDispatch();
  const handleClickIncrementCart = (product) => {
    dispatch(pushInCart(changeQuantityProduct(cartToDisplay, product, 1)));
    dispatch(setCount(1));
  };
  const handleClickDecrementCart = (product) => {
    dispatch(pushInCart(changeQuantityProduct(cartToDisplay, product, -1)));
    dispatch(setCount(-1));
  };
  //
  // variable and state for purchase popup
  //
  const [isHover, setIsHover] = useState(false);
  const [isHoverRedirection, setIsHoverRedirection] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const windowVariants = {
    open: {
      width: '300px',
      height: 'auto',
      top: '14px',
      zIndex: '5',
      y: '80px',
      x: '-90px',
      border: 'solid 2px rgb(53, 104, 89)',
      transition: {
        duration: 0.5,
        width: { delay: 0.5 },
        height: { delay: 0.5 },
        zIndex: { delay: 0.2 },
        border: { delay: 0.1 },
      },
    },
    closed: {
      width: '30px',
      height: '30px',
      y: 0,
      x: 0,
      zIndex: '-5',
      transition: {
        duration: 0.5,
        delay: 0.4,
        y: { delay: 0.5 },
        width: { delay: 0.5 },
        height: { delay: 0.5 },
        zIndex: { delay: 0.2 },
      },
    },
  };
  const textVariants = {
    open: {
      width: '300px',
      opacity: 1,
      visibility: 'visible',
      zIndex: 5,
      transition: {
        duration: 0.5,
        opacity: { delay: 0.5 },
        visibility: { delay: 0.5 },
        zIndex: { delay: 0.2 },
      },
    },
    closed: {
      width: 0,
      opacity: 0,
      visibility: 'hidden',
      zIndex: -5,
      transition: {
        duration: 0.5,
        width: { delay: 0.3 },
        opacity: { delay: 0.3 },
        visibility: { delay: 0.3 },
      },
    },
  };
  return (
    <div
      className="countCart-container"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <motion.div
        className="headerCart"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.1, type: 'spring', damping: 12, stiffness: 500,
          },
        }}
      >
        {countOfProducts !== 0 && (
        <div className="cart">
          <div className="icon">
            <ion-icon name="cart-outline" style={{ fontSize: '55px', color: '#356859' }} />
            <motion.div
              className="countLargeSize"
              key={countOfProducts}
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.1, type: 'spring', damping: 12, stiffness: 500,
                },
              }}
            >
              <p>
                {countOfProducts}
              </p>
            </motion.div>
          </div>
        </div>
        )}
        <motion.div
          className="cartWindow"
          initial="closed"
          animate={isHover ? 'open' : 'closed'}
          variants={windowVariants}
        >
          <motion.div
            className="cartText"
            initial="closed"
            animate={isHover ? 'open' : 'closed'}
            variants={textVariants}
          >
            <ul>
              {cartToDisplay.map((product, index) => (
                <li
                  className="productToDisplay"
                  key={product.name}
                >
                  <div className="product-line">
                    <div className="product-name">
                      {product.name}
                    </div>
                    <div className="dotted" />
                    <div className="product_price">
                      {(product.price * product.quantity).toFixed(2)}€
                    </div>
                  </div>
                  <div className="carWithCount-button-group">
                    <div className="cartWithCountIncrement">
                      <ion-icon
                        name="remove-circle-outline"
                        style={{ fontSize: '1.5em', color: -(index + 1) === activeIndex ? '#fd7c55' : '#356859' }}
                        onClick={() => handleClickDecrementCart(product)}
                        className="carWithCount-button"
                        onMouseDown={() => setActiveIndex(-(index + 1))}
                        onMouseUp={() => setActiveIndex(null)}
                      />

                      <ion-icon
                        name="add-circle-outline"
                        style={{ fontSize: '1.5em', color: (index + 1) === activeIndex ? '#fd7c55' : '#356859' }}
                        onClick={() => handleClickIncrementCart(product)}
                        className="carWithCount-button"
                        onMouseDown={() => setActiveIndex((index + 1))}
                        onMouseUp={() => setActiveIndex(null)}
                      />
                    </div>
                    <div className="carWithCount-button-group-meta">
                      {`${product.quantity} x ${product.parcel} ${product.unity === undefined ? 'Pce' : product.unity}`}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="globalAmount">
              {`Total: ${cartAmount}€`}
            </div>
            <div
              className="redirection"
              onClick={handleClick}
              onMouseOver={() => setIsHoverRedirection(true)}
              onMouseOut={() => setIsHoverRedirection(false)}
            >
              <div className="redirection-text">
                Voir mon panier
              </div>
              <motion.div
                className="rediction-icon"
                animate={{
                  rotate: isHoverRedirection ? [0, 360, 0] : 0,
                  x: isHoverRedirection ? [0, 90, 0] : 0,
                  transition: {
                    duration: 1.5,
                  },
                }}
              >
                <ion-icon name="arrow-forward-circle-outline" style={{ color: isHoverRedirection ? '#fd7c55' : '#356859' }} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>

  );
}

export default CartWithCount;
