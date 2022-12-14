import logo from 'src/assets/logo.svg';
import './resetPassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import {
  addErrorMessage, changeSubscribeForm,
} from '../../feature/user.slice';
import {
  validateUpperCase, validateLength, validateDigit, validateScdPassword,
} from '../../utils/validatePassword';
import Field from '../LoginForm/Field/Field';
import { setButtonText, setShowModal } from '../../feature/navigation.slice';
import Button from '../Button/Button';
import { updatePassword } from '../../AsyncChunk/AsyncChunkUser';

function ResetPassword() {
  //
  //
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const error = query.get('error');
  const token = query.get('token');
  const getMessage = () => {
    if (error === 'expired') {
      return 'Le lien de réinitialisation est périmé, réitère la procédure';
    }
    if (error === 'not-found') {
      return 'utilisateur non trouvé';
    }
    return 'Une erreur est survenue, contacte l\'administrateur';
  };
  useEffect(() => {
    const timerToRedirection = () => setTimeout(() => {
      navigate('/');
    }, 4000);
    if (error || !token) {
      timerToRedirection();
    }
    return () => clearTimeout(timerToRedirection);
  }, []);
  //
  //
  const {
    password, sndPassword,
  } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleChangeSubscribeForm = (value, key) => {
    dispatch(changeSubscribeForm([key, value]));
  };
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [isFocusScdPassword, setIsFocusScdPassword] = useState(false);
  const width = useSelector((state) => state.navigation.width);
  const handleSubscribe = () => {
    let isError = false;
    if (validateUpperCase(password) === false) {
      isError = true;
      dispatch(addErrorMessage('une majuscule au mot de passe'));
    }
    if (validateLength(password) === false) {
      isError = true;
      dispatch(addErrorMessage('Mot de passe de 6 caractères'));
    }
    if (validateDigit(password) === false) {
      isError = true;
      dispatch(addErrorMessage('Un chiffre au mot de passe'));
    }
    if (validateScdPassword(password, sndPassword) === false) {
      isError = true;
      dispatch(addErrorMessage('Mots de passe différents'));
    }
    if (isError === true) {
      dispatch(setButtonText('ok!'));
      dispatch(setShowModal(true));
    }
    if (isError === false) {
      dispatch(updatePassword(token));
    }
  };
  if (error || !token) {
    return (
      <div className="error-container">
        <motion.div
          className="error"
          onClick={handleClick}
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
        >
          <div
            className="error-title"
          >{getMessage()}
          </div>
          <div
            className="error-content"
          >
            Retour sur la page de connexion
          </div>
          <ion-icon name="arrow-forward-circle-outline" size="large" />
        </motion.div>
      </div>
    );
  }
  return (
    <div className="ResetPassword-container">
      <div className="form-ResetPassword-container">
        <img className="form-ResetPassword-logo" src={logo} alt="logo Tournichette" />
        <h1 className="form-ResetPassword-title-subscribe">Saisis ton nouveau mot de passe</h1>
        <div className="form-ResetPassword-field-container">
          <form onSubmit={handleSubscribe}>
            <Field
              name="password"
              type="password"
              onFocus={() => setIsFocusPassword(true)}
              onBlur={() => setIsFocusPassword(false)}
              value={password}
              placeholder="Mot de passe"
              onChange={handleChangeSubscribeForm}
            />
            <Field
              name="sndPassword"
              type="password"
              onFocus={() => setIsFocusScdPassword(true)}
              onBlur={() => setIsFocusScdPassword(false)}
              value={sndPassword}
              placeholder="Confirmation mdp"
              onChange={handleChangeSubscribeForm}
            />
            <div className="form-button-container">
              <Button
                text="Valider"
                icon="checkmark-circle-outline"
                onClick={() => handleSubscribe()}
              />
            </div>
          </form>
          <AnimatePresence mode="wait">
            {(isFocusPassword && width > 724) && (
            <motion.div
              className="check-password"
              key="password"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 400, opacity: 1, zIndex: 0 }}
              exit={{ x: 120, opacity: 0, zIndex: 0 }}
            >
              <div className="checkbox">
                <ion-icon name={`${validateLength(password) ? 'checkmark' : 'close'}-outline`} style={{ color: validateLength(password) ? 'green' : 'red' }} />
                <p>6 caractères</p>
              </div>
              <div className="checkbox">
                <ion-icon name={`${validateUpperCase(password) ? 'checkmark' : 'close'}-outline`} style={{ color: validateUpperCase(password) ? 'green' : 'red' }} />
                <p>1 majuscule</p>
              </div>
              <div className="checkbox">
                <ion-icon name={`${validateDigit(password) ? 'checkmark' : 'close'}-outline`} style={{ color: validateDigit(password) ? 'green' : 'red' }} />
                <p>1 chiffre</p>
              </div>
            </motion.div>
            )}
            {(isFocusScdPassword && width > 724) && (
            <motion.div
              className="check-password"
              key="scdPassword"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 400, opacity: 1 }}
              exit={{ x: 120, opacity: 0 }}
            >
              <div className="checkbox">
                <ion-icon name={`${validateScdPassword(password, sndPassword) ? 'checkmark' : 'close'}-outline`} style={{ color: validateScdPassword(password, sndPassword) ? 'green' : 'red' }} />
                <p>{validateScdPassword(password, sndPassword) ? 'Mdp identiques!' : 'Mdp différents'}</p>
              </div>
            </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>

  );
}
export default ResetPassword;
