/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState } from 'react';
import './user.scss';
import 'src/components/User/orders.scss';

function OrderHistory({ order }) {
  const [isActive, setIsActive] = useState(false);
  const textVariants = {
    open: {
      x: 0,
      display: 'block',
      transition: {
        duration: 0.4,
      },
    },
    closed: {
      x: '150%',
      display: 'none',
      transition: {
        duration: 0.4,
        display: { delay: 0.4 },
      },
    },
  };
  return (
    <div className="orderHistory-one">
      <ul>
        <li className="orderHistory-date">Commande du {order.dateOrder.slice(0, 10)}</li>
        <li className="orderHistory-depot">Déposé au {order.depot.address}</li>
        <motion.div
          className="orderHistory-detail"
          initial="closed"
          animate={isActive ? 'open' : 'closed'}
          variants={textVariants}
        >
          { order.orderProducts.map((product) => (
            <li
              className="orderHistory-product"
              key={product.product.slug}
            >
              {`${(product.product.unity === 'kg' ? parseInt(product.quantity, 10) : product.quantity)}${product.product.unity}`} {product.product.name} / {product.product.price}€
            </li>
          ))}
          { order.cartOrders.map((cart) => (
            <li
              className="orderHistory-product"
              key={cart.cart.name}
            >
              {cart.quantity} {cart.cart.name} /{cart.cart.price}€
            </li>
          ))}
        </motion.div>
        <li className="orderHistory-price">Prix total: {order.price}€</li>
      </ul>
      <motion.button
        className="orderHistory-button"
        type="button"
        onClick={() => setIsActive(!isActive)}
        animate={{
          rotate: isActive ? 180 : 0,
          transition: {
            duration: 0.3,
          },
        }}
      >
        <ion-icon name="chevron-down-circle-outline" style={{ color: isActive ? '#fd7c55' : '' }} />

      </motion.button>

    </div>
  );
}

export default OrderHistory;
