/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import {
  PaymentElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { setButtonText, setShowModal } from '../feature/navigation.slice';
import { setServerMessage } from '../feature/shoppingCart.slice';
import { postOrder } from '../AsyncChunk/AsyncChunkShoppingCart';

function CheckoutForm({
  paymentIntentId, paymentCustomerId, isStripeTop, setIsFocus,
}) {
  const amount = useSelector((state) => state.shoppingCart.cartAmount);
  const stripe = useStripe();
  const elements = useElements();
  const baseUrl = useSelector((state) => state.navigation.baseUrl);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Paiement effectué!');
          break;
        case 'processing':
          setMessage('Paiement en cours');
          break;
        case 'requires_payment_method':
          dispatch(setServerMessage('Paiement annulé, il faut recommencer.'));
          dispatch(setButtonText('Ok!'));
          dispatch(setShowModal(true));
          break;
        default:
          dispatch(setServerMessage('Une erreur est survenue'));
          dispatch(setButtonText('Fermer'));
          dispatch(setShowModal(true));
          break;
      }
    });
  }, [stripe]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/commande-ok`,
      },
      redirect: 'if_required',
    });
    if (error) {
      dispatch(setServerMessage(error.message));
      dispatch(setButtonText('Valider'));
      dispatch(setShowModal(true));
    }
    if (!error) {
      dispatch(postOrder({ stripeCustomerId: paymentCustomerId, paymentId: paymentIntentId }));
      navigate('/commande-ok', { state: { origin: 'creditCard' } });
    }
    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <PaymentElement
        id="payment-element"
        onFocus={() => setIsFocus(false)}
      />
      {!isStripeTop && (
      <motion.button
        className="creditCard-button"
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <span id="button-text">
          {isLoading ? <motion.div className="spinner" id="spinner" /> : `Payer maintenant ${amount}€`}
        </span>
      </motion.button>
      )}

      {message && <motion.div id="payment-message">{message}</motion.div>}
    </form>
  );
}
CheckoutForm.propTypes = {
  paymentIntentId: PropTypes.string.isRequired,
  isStripeTop: PropTypes.bool.isRequired,
  paymentCustomerId: PropTypes.string.isRequired,
  setIsFocus: PropTypes.func.isRequired,
};
export default CheckoutForm;
