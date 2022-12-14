import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { postOrder } from '../../AsyncChunk/AsyncChunkShoppingCart';
import { getSelectedDepotId, setIsCreditCardLayout, setSelectedDepot } from '../../feature/shoppingCart.slice';
import './choiseDepotPoints.scss';
import Stripe from '../../stripe/StripeContainer';
import Button from '../Button/Button';

function ChoiseDepotPoints() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCreditCardLayout = useSelector((state) => state.shoppingCart.isCreditCardLayout);
  const depots = useSelector((state) => state.shoppingCart.depots.data);
  const selectedDepot = useSelector((state) => state.shoppingCart.selectedDepot);
  const [isSelectDepotLayout, setIsSelectDepotLayout] = useState(true);
  const [isPaymentchoiseLayout, setIsPaymentChoiseLayout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  useEffect(() => {
    setIsSelectDepotLayout(true);
    setIsPaymentChoiseLayout(false);
    dispatch(setIsCreditCardLayout(false));
    setSelectedPayment('');
    dispatch(setSelectedDepot(''));
  }, []);
  //
  // get adress of depots
  //
  const ArrayOfDepotsAdress = [];
  depots.forEach((depot) => ArrayOfDepotsAdress.push(depot.address));
  //
  // get depot id & adress in state when selectedDepot value change
  //
  const handleChange = (e) => {
    dispatch(setSelectedDepot(e.target.id));
    dispatch(getSelectedDepotId());
    setIsSelectDepotLayout(false);
    setIsPaymentChoiseLayout(true);
  };
  //
  // set message state and modal
  //
  const handleClick = () => {
    dispatch(postOrder());
    navigate('/commande-ok', { state: { origin: 'cash' } });
  };
  const handleChangePayment = (e) => {
    setSelectedPayment(e.target.id);
  };
  const handleCreditCardLayout = () => {
    setIsPaymentChoiseLayout(false);
    dispatch(setIsCreditCardLayout(true));
  };
  const title = () => {
    if (isPaymentchoiseLayout || isCreditCardLayout) {
      return 'Paiement';
    }
    return 'Point de retrait';
  };
  return (
    <div className="depot-container">
      <div className="depot-title">
        <ion-icon name="bag-check-outline" style={{ paddingBottom: '5px' }} />
        <p>{title()}</p>
      </div>
      {isSelectDepotLayout && (
      <ul className="radio-container">
        {depots.map((depot) => (
          <li
            key={depot.id}
          >
            <input
              type="radio"
              className="radio"
              id={depot.address}
              name="adressRadio"
              checked={depot.address === selectedDepot}
              onChange={handleChange}
            />
            <label className={`depot-label ${depot.address === selectedDepot ? 'selected' : ''}`} htmlFor={depot.address}>{depot.address}</label>
            <div className="depot-information">
              {depot.informations}
            </div>
          </li>
        ))}
      </ul>
      )}
      {isPaymentchoiseLayout && (
      <ul className="radio-container">

        <li
          className="paymentLine"
        >
          <label
            htmlFor="onSite"
            className={selectedPayment === 'onSite' ? 'selected' : ''}
          >
            <input
              type="radio"
              className="radio"
              id="onSite"
              name="paymentChoiseRadio"
              checked={selectedPayment === 'onSite'}
              onChange={handleChangePayment}
            />
            <ion-icon name="cash-outline" style={{ marginRight: '10px' }} />
            Paiement au retrait de la commande
            {selectedPayment === 'onSite' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" width="32" height="32" viewBox="0 0 512 512" color="#fd7c55"><title>Checkmark Circle</title>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 176L217.6 336 160 272"
                />
              </svg>
            )}
          </label>
        </li>
        <li
          className="paymentLine"
        >
          <label
            htmlFor="creditCard"
            className={selectedPayment === 'creditCard' ? 'selected' : ''}
          >
            <input
              type="radio"
              className="radio"
              id="creditCard"
              name="paymentChoiseRadio"
              checked={selectedPayment === 'creditCard'}
              onChange={handleChangePayment}
            />
            <ion-icon name="card-outline" style={{ marginRight: '10px' }} />
            Paiement par carte bancaire
            {selectedPayment === 'creditCard' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" width="32" height="32" viewBox="0 0 512 512" color="#fd7c55"><title>Checkmark Circle</title>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 176L217.6 336 160 272"
                />
              </svg>
            )}
          </label>
        </li>
        {selectedPayment && (
        <motion.div
          className="validOrderButton"
          onClick={selectedPayment === 'onSite' ? handleClick : handleCreditCardLayout}
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}

        >
          <Button text="Valider" icon="checkmark-circle-outline" />
        </motion.div>
        )}
      </ul>
      )}
      {isCreditCardLayout && (
        <Stripe />
      )}
    </div>
  );
}

export default ChoiseDepotPoints;
