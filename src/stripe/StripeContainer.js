/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import './stripeContainer.scss';
import { loadStripe } from 'react-stripe-js';
import { motion } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CheckoutForm from './CheckoutForm';
import { setServerMessage } from '../feature/shoppingCart.slice';
import { setButtonText, setShowModal } from '../feature/navigation.slice';
import { postOrder } from '../AsyncChunk/AsyncChunkShoppingCart';
import { setpaymentCustomerId } from '../feature/user.slice';

const PUBLIC_KEY = 'pk_test_51Lg4rDEUfQPSV59kZLzUyYVz3DHuJprHXB7Nv6PozToLr3ddyVlyj8NoEndy4Z1qdLkGRo3TWUnyN7Y4SA9Kz4TI00PnqOc0yx';
const stripePromise = loadStripe(PUBLIC_KEY);

function Stripe() {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const amount = useSelector((state) => state.shoppingCart.cartAmount);
  const paymentCustomerId = useSelector((state) => state.user.user.paymentCustomerId);
  const baseUrlNode = useSelector((state) => state.navigation.baseUrlNode);
  const width = useSelector((state) => state.navigation.width);
  const email = useSelector((state) => state.user.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentCustomerId) {
      fetch(`${baseUrlNode}/create-customer`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setpaymentCustomerId(data.customer.id));
        });
    }
    if (paymentCustomerId) {
      fetch(`${baseUrlNode}/create-payment-intent`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, customer: paymentCustomerId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPaymentMethods(data.paymentMethods.data);
          setPaymentIntentId(data.paymentIntentId);
          setClientSecret(data.clientSecret);
        });
    }
  }, [paymentCustomerId]);
  //
  //
  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.id);
  };
  //
  //
  const handleSubmitPayment = () => {
    setIsLoading(true);
    fetch(`${baseUrlNode}/charge-existing-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, paymentCustomerId, paymentMethod }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(setServerMessage(data.error));
          setIsLoading(false);
          dispatch(setButtonText('Valider'));
          dispatch(setShowModal(true));
        }
        else {
          setIsLoading(false);
          dispatch(postOrder({ stripeCustomerId: paymentCustomerId, paymentId: data.paymentIntentId }));
          navigate('/commande-ok', { state: { origin: 'creditCard' } });
        }
      });
  };
  const handleClickDeletePaymentMethod = (e) => {
    const paymentMethodList = paymentMethods.filter((method) => method.card.fingerprint === e.target.id);
    const paymentMethodIdList = [];
    paymentMethodList.forEach((method) => paymentMethodIdList.push(method.id));
    fetch(`${baseUrlNode}/delete-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentMethodIdList }),
    })
      .then((res) => res.json())
      .then(() => {
        const newArrayOfPaymentMethod = paymentMethods.filter((method) => method.card.fingerprint !== e.target.id);
        setPaymentMethods(newArrayOfPaymentMethod);
      });
  };
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  const paymentMethodArray = [];
  paymentMethods.forEach((element) => {
    if (!paymentMethodArray.some((method) => element.card.fingerprint === method.card.fingerprint)) {
      paymentMethodArray.push(element);
    }
  });
  //
  //

  return (
    <div className="stripe">
      {(paymentMethods.length !== 0) && (
        <div
          className="stripe-top"
          onFocus={() => setIsFocus(true)}
        >
          <h2 className="title-paymentMethod">
            Selectionne une carte
          </h2>
          <ul
            className="paymentMethod-container"
          >
            {paymentMethodArray.map((method) => (
              <li
                key={method.id}
                className="paymentMethod-line"
              >
                <ion-icon
                  name="trash-outline"
                  style={{ fontSize: '1.3em' }}
                  id={method.card.fingerprint}
                  onClick={handleClickDeletePaymentMethod}
                />
                <label
                  htmlFor={method.id}
                  className={`paymentMethod-label ${(paymentMethod === method.id && isFocus) ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    className="radio"
                    id={method.id}
                    name="paymentChoiseRadio"
                    checked={paymentMethod === method.id}
                    onChange={handleChangePaymentMethod}
                  />
                  <div className="paymentMethod">
                    <p
                      className="brand"
                    >{method.card.brand}
                    </p>
                    <p>**** **** **** {method.card.last4}</p>
                    <p>exp {method.card.exp_month}/{method.card.exp_year}</p>
                    {(paymentMethod === method.id && isFocus && width > 380) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" width="32" height="32" viewBox="0 0 512 512" color="#fd7c55"><title>Checkmark Circle</title>
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeWidth="32"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M352 176L217.6 336 160 272"
                      />
                    </svg>
                    )}
                  </div>

                </label>
              </li>
            ))}
          </ul>
          {(paymentMethod && isFocus) && (
            <motion.button
              className="creditCard-button paymentMethod"
              type="button"
              onClick={handleSubmitPayment}
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner" /> : `Payer maintenant ${amount}€`}
              </span>
            </motion.button>
          )}

        </div>

      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <h2 className="title-paymentMethod">
            {paymentMethods.length !== 0 ? 'Ou saisis ta nouvelle carte' : 'Saisis ta nouvelle carte'}
          </h2>
          <CheckoutForm paymentIntentId={paymentIntentId} paymentCustomerId={paymentCustomerId} isStripeTop={isFocus} setIsFocus={setIsFocus} />
        </Elements>
      )}
    </div>
  );
}

export default Stripe;
