import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createUser, updateUserWithGoogle } from '../../AsyncChunk/AsyncChunkUser';
import {
  deleteButtonText,
  deleteNavigationMessage,
  deleteRedirection,
  setIsPassword,
  setIsPhone,
  setLoginWithGoogleRejected,
  setShowModal,
} from '../../feature/navigation.slice';
import { deleteMessageProductsServer } from '../../feature/products.slice';
import { deleteServerMessage } from '../../feature/shoppingCart.slice';
import {
  changeSubscribeForm,
  deleteErrorMessage,
  deleteServerMessageUser,
  setIsSubscribe,
} from '../../feature/user.slice';
import { validateScdPassword } from '../../utils/validatePassword';
import Button from '../Button/Button';
import Field from '../LoginForm/Field/Field';

function Modal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = useSelector((state) => state.navigation.showModal);
  const navigationMessage = useSelector((state) => state.navigation.navigationMessage);
  const serverMessageShoppingCart = useSelector((state) => state.shoppingCart.serverMessage);
  const serverMessageUser = useSelector((state) => state.user.serverMessageUser);
  const errorUserMessage = useSelector((state) => state.user.errorMessage);
  const isSubscribe = useSelector((state) => state.user.isSubscribe);
  const messageProductsServer = useSelector((state) => state.products.messageProductsServer);
  const isPhone = useSelector((state) => state.navigation.isPhone);
  const isPassword = useSelector((state) => state.navigation.isPassword);
  const buttonText = useSelector((state) => state.navigation.buttonText);
  const redirection = useSelector((state) => state.navigation.redirection);
  const height = useSelector((state) => state.navigation.height);
  const { phone, password, sndPassword } = useSelector((state) => state.user.user);
  const handleChange = (value, key) => {
    dispatch(changeSubscribeForm([key, value]));
  };

  const deleteMessage = () => {
    if (messageProductsServer) {
      dispatch(deleteMessageProductsServer());
    }
    if (navigationMessage) {
      dispatch(deleteNavigationMessage());
    }
    if (serverMessageShoppingCart) {
      dispatch(deleteServerMessage());
    }
    if (serverMessageUser) {
      dispatch(deleteServerMessageUser());
    }
    if (errorUserMessage.length !== 0) {
      dispatch(deleteErrorMessage([]));
    }
  };
  const handleModal = () => {
    if (redirection) {
      navigate(redirection);
    }
    if (isSubscribe && errorUserMessage.length === 0) {
      dispatch(setIsSubscribe(false));
    }
    if (isPhone) {
      dispatch(createUser(true));
      dispatch(setLoginWithGoogleRejected(false));
      dispatch(setIsPhone(false));
    }
    if (isPassword) {
      dispatch(updateUserWithGoogle());
      dispatch(setLoginWithGoogleRejected(false));
      dispatch(setIsPassword(false));
    }
    dispatch(deleteButtonText());
    dispatch(deleteRedirection());
    deleteMessage();
    dispatch(setShowModal(false));
  };
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: (height * 0.4),
      opacity: 1,
      transition: { delay: 0.5 },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <div className="modal-container">
          <motion.div
            className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="modal"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {(navigationMessage || serverMessageShoppingCart || serverMessageUser) && (
                <p>{navigationMessage || serverMessageShoppingCart || serverMessageUser}</p>
              )}
              {(errorUserMessage.length !== 0) && (
                <ul className="error-message-container">
                  {errorUserMessage.map((error) => <li key={error}>{error}</li>)}
                </ul>
              )}
              {isPhone && (
                <div className="modalInput">
                  <p> Entre ton numéro de téléphone pour finaliser ton inscription</p>
                  <Field
                    name="phone"
                    type="text"
                    value={phone}
                    placeholder="Téléphone"
                    onChange={handleChange}
                  />
                </div>
              )}
              {isPassword && (
                <div className="modalInput">
                  <p>Un compte existe déjà à cet email.
                    Entre le mot de passe de la Tournichette pour lier tes comptes
                  </p>
                  <Field
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    value={password}
                    placeholder="Mot de passe"
                    onChange={handleChange}
                  />
                  <Field
                    name="sndPassword"
                    type="password"
                    autocomplete="current-password"
                    value={sndPassword}
                    placeholder="Confirmation mdp"
                    onChange={handleChange}
                  />
                  <motion.div
                    className="check-password-google"
                    key="scdPassword"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 120, opacity: 0 }}
                  >
                    <div className="checkbox">
                      <ion-icon name={`${validateScdPassword(password, sndPassword) ? 'checkmark' : 'close'}-outline`} style={{ color: validateScdPassword(password, sndPassword) ? 'green' : 'red' }} />
                      <p>{validateScdPassword(password, sndPassword) ? 'Mdp identiques!' : 'Mdp différents'}</p>
                    </div>
                  </motion.div>
                </div>
              )}
              <Button
                text={buttonText}
                icon="checkmark-circle-outline"
                onClick={handleModal}
              />
            </motion.div>
          </motion.div>
        </div>

      )}

    </AnimatePresence>
  );
}

export default Modal;
