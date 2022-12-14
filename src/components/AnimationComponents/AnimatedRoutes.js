/* eslint-disable no-nested-ternary */
import {
  Route, Routes,
} from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import '../Page/singlePage.scss';
import Cgu from '../Cgu/Cgu';
import Home from '../Home/Home';
import LegalNotice from '../LegalNotice/LegalNotice';
import NotFound from '../NotFound/NotFound';
import Modal from '../Modal/Modal';
import { setShowModal } from '../../feature/navigation.slice';
import Page from '../Page/Page';
import StaticProductsDisplay from '../StaticProductsDisplay/StaticProductsDisplay';
import CartWithCount from '../CartWithCount/CartWithCount';
import ChoiseDepotPoints from '../ChoiseDepotPoints/ChoiseDepotPoints';
import ShoppingCartEmpty from '../ShoppingCart/ShoppingCartEmpty';
import ShoppingCartPaymentSuccess from '../ShoppingCart/ShoppingCartPaymentSuccess';
import Products from '../Products/Products';
import Product from '../Product/Product';
import UserContact from '../User/UserContact';
import Orders from '../User/Orders';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import User from '../User/User';

function AnimatedRoutes() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.shoppingCart.count);
  const cartToDisplay = useSelector((state) => state.shoppingCart.shoppingCart);
  const stateWidth = useSelector((state) => state.navigation.width);
  return (
    <>
      <Modal />
      <AnimatePresence mode="wait" onExitComplete={() => dispatch(setShowModal(false))}>
        <Routes>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route
            path="/liste"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <Products />
                  </div>
                  <div className="largeComponent">
                    <StaticProductsDisplay />
                  </div>
                  {count !== 0 && <CartWithCount />}
                </div>
              </Page>
            )
              : (<Page><Products related="products" /></Page>)}
          />
          <Route
            path="/produit/:slugProduct"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <Products />
                  </div>
                  <div className="largeComponent">
                    <Product />
                  </div>
                  {count !== 0 && <CartWithCount />}
                </div>
              </Page>
            )
              : (<Page><Product /></Page>)}
          />
          <Route
            path="/categorie/:slugCategory"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <Products />
                  </div>
                  <div className="largeComponent">
                    <StaticProductsDisplay />
                  </div>
                  {count !== 0 && <CartWithCount />}
                </div>
              </Page>
            )
              : (<Page><Products /></Page>)}

          />
          <Route
            path="/categorie/:slugCategory/:slugProduct"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <Products />
                  </div>
                  <div className="largeComponent">
                    <Product />
                  </div>
                  {count !== 0 && <CartWithCount />}
                </div>
              </Page>
            )
              : (<Page><Product /></Page>)}
          />
          <Route
            path="/paniers/:slugCart"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <Products />
                  </div>
                  <div className="largeComponent">
                    <Product />
                  </div>
                  {count !== 0 && <CartWithCount />}
                </div>
              </Page>
            )
              : (<Page><Product /></Page>)}
          />
          <Route
            path="/NosPaniers"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <Products />
                  </div>
                  <div className="largeComponent">
                    <StaticProductsDisplay />
                  </div>
                  {count !== 0 && <CartWithCount />}
                </div>
              </Page>
            )
              : (<Page><Products /></Page>)}
          />
          <Route
            path="/profil"
            element={stateWidth >= 1024 ? (
              <Page>
                <div className="singlePage-container">
                  <div className="smallComponent">
                    <UserContact />
                  </div>
                  <div className="largeComponent">
                    <Orders />
                  </div>
                </div>
              </Page>
            )
              : (<Page><User /></Page>)}
          />
          <Route
            path="/MesAchats"
            element={
              cartToDisplay.length === 0
                ? (
                  <Page>
                    <ShoppingCartEmpty />
                  </Page>
                )
                : stateWidth >= 1024 ? (
                  <Page>
                    <div className="singlePage-container">
                      <div className="smallComponent">
                        <ChoiseDepotPoints />
                      </div>
                      <div className="largeComponent">
                        <ShoppingCart />
                      </div>
                    </div>
                  </Page>
                )
                  : (<Page><ShoppingCart /></Page>)
                }
          />
          <Route
            path="/commande-ok"
            element={(
              <Page>
                <ShoppingCartPaymentSuccess />
              </Page>
          )}
          />
          <Route path="/profil/historique" element={<Page><Orders /></Page>} />
          <Route path="/profil/coordonnees" element={<Page><UserContact /></Page>} />
          <Route path="/CGU" element={<Page><Cgu /></Page>} />
          <Route path="/mentions-legales" element={<Page><LegalNotice /></Page>} />
          <Route path="/*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
    </>

  );
}
export default AnimatedRoutes;
