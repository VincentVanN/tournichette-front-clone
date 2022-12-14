import 'src/components/User/userContact.scss';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeEditForm, addErrorMessage, setMailing } from 'src/feature/user.slice';
import { updateUser } from 'src/AsyncChunk/AsyncChunkUser';
import Field from 'src/components/LoginForm/Field/Field';
import Button from '../Button/Button';
import {
  isValidEmail,
} from '../../utils/validatePassword';
import { setButtonText, setShowModal } from '../../feature/navigation.slice';

function UserContact() {
  const {
    firstname, lastname, phone, email, password, sndPassword, oldPassword, emailNotifications,
  } = useSelector((state) => state.user.user);
  const [isForm, setIsForm] = useState(false);
  const dispatch = useDispatch();
  const handleChangeEditForm = (value, key) => {
    dispatch(changeEditForm([key, value]));
  };
  const handleChangeMailing = () => {
    dispatch(setMailing());
  };
  const { errorMessage } = useSelector((state) => state.user);
  const handleSubmit = () => {
    let isError = false;
    if (firstname === '') {
      isError = true;
      dispatch(addErrorMessage('Prénom obligatoire'));
    }
    if (lastname === '') {
      isError = true;
      dispatch(addErrorMessage('Nom obligatoire'));
    }
    if (phone === '') {
      isError = true;
      dispatch(addErrorMessage('Téléphone obligatoire'));
    }
    if (isValidEmail(email) === false) {
      isError = true;
      dispatch(addErrorMessage('L\'email non valide'));
    }
    if (oldPassword.length === 0) {
      isError = true;
      dispatch(addErrorMessage('Le mdp est obligatoire pour toute modification'));
    }
    if (isError === true) {
      dispatch(setButtonText('ok!'));
      dispatch(setShowModal(true));
    }
    if (isError === false) {
      dispatch(updateUser());
      setIsForm(false);
    }
  };

  if (errorMessage.length !== 0) {
    return (
      <div className="errorMessage-container">
        <ul className="errorMessage-list">
          {errorMessage.map((error) => (
            <li className="errorMessage-li">
              <ion-icon name="close-circle-outline" style={{ color: '#f88e6d', fontSize: '40px' }} />
              <p className="errorMessage">{error}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const textVariants = {
    open: {
      x: 0,
      display: 'flex',
      transition: {
        delay: 0.2,
        duration: 0.2,
      },
    },
    closed: {
      x: '130%',
      display: 'none',
      transition: {
        duration: 0.2,
        display: { delay: 0.2 },
      },
    },
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="contactForm"
    >
      <header className="contactForm-header">
        <div className="contactForm-title"><p>Profil</p></div>
      </header>
      <ul className="updateUserAccount">
        <div className="updateUserAccount-container ">
          <motion.li
            className="updateUserAccount list-item"
            initial="open"
            animate={!isForm ? 'open' : 'closed'}
            variants={textVariants}
          >{firstname}
          </motion.li>
          <Field
            name="firstname"
            type="text"
            value={firstname}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
        <div className="updateUserAccount-container ">
          <motion.li
            className="updateUserAccount list-item"
            initial="open"
            animate={!isForm ? 'open' : 'closed'}
            variants={textVariants}
          >{lastname}
          </motion.li>
          <Field
            name="lastname"
            type="text"
            value={lastname}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
        <div className="updateUserAccount-container ">
          <motion.li
            className="updateUserAccount list-item"
            initial="open"
            animate={!isForm ? 'open' : 'closed'}
            variants={textVariants}
          >{phone}
          </motion.li>
          <Field
            name="phone"
            type="text"
            value={phone}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
        <div className="updateUserAccount-container ">
          <motion.li
            className="updateUserAccount list-item"
            initial="open"
            animate={!isForm ? 'open' : 'closed'}
            variants={textVariants}
          >{email}
          </motion.li>
          <Field
            name="email"
            type="text"
            autocomplete="username"
            value={email}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
        <div className="updateUserAccount-container ">
          <motion.li
            className="updateUserAccount list-item"
            initial="open"
            animate={!isForm ? 'open' : 'closed'}
            variants={textVariants}
          >
            {emailNotifications ? 'tu es inscrit à l\'envoi d\'email' : 'tu n\'es pas inscrit à l\'envoi d\'email'}
          </motion.li>
          <motion.div
            className="checkBoxWrapper"
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          >
            <div
              className="checkBoxWrapper-button"
              style={{ background: emailNotifications ? '#fd7c55' : '' }}
              onClick={handleChangeMailing}
            />
            <label className="checkMailingLabel" htmlFor="checkMailing">
              <input
                type="checkbox"
                id="checkMailing"
                value={emailNotifications}
                checked={emailNotifications}
                onChange={handleChangeMailing}
              />
              Recevoir les Emails d'ouverture des ventes?
            </label>
          </motion.div>
        </div>
        <div className="updateUserAccount-container ">
          <motion.p
            className="updateUserAccount input-item"
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          >Ancien mot de passe
          </motion.p>
          <Field
            name="oldPassword"
            type="password"
            placeholder="Ancien mot de passe"
            autocomplete="current-password"
            value={oldPassword}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
        <div className="updateUserAccount-container ">
          <motion.p
            className="updateUserAccount input-item"
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          >Nouveau mot de passe
          </motion.p>
          <Field
            name="password"
            type="password"
            placeholder="Nouveau mot de passe"
            autocomplete="new-password"
            value={password}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
        <div className="updateUserAccount-container ">
          <motion.p
            className="updateUserAccount input-item"
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          >Confirmez votre mot de passe
          </motion.p>
          <Field
            name="sndPassword"
            type="password"
            autocomplete="new-password"
            placeholder="Confirmez votre mot de passe"
            value={sndPassword}
            onChange={handleChangeEditForm}
            initial="closed"
            animate={isForm ? 'open' : 'closed'}
            variants={textVariants}
          />
        </div>
      </ul>

      {isForm && (
        <div className="contactForm-button-container">
          <Button
            icon="arrow-undo-outline"
            text="Retour"
            onClick={() => setIsForm(!isForm)}
          />
          <Button
            icon="checkmark-circle-outline"
            text="Valider"
            onClick={() => handleSubmit()}
          />
        </div>
      )}
      {!isForm && (
        <div className="contactForm-button-container">
          <Button
            icon="create-outline"
            text="Editer"
            onClick={() => setIsForm(!isForm)}
          />
        </div>
      )}
    </form>

  );
}

export default UserContact;
