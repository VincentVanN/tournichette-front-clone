/* eslint-disable consistent-return */
import { motion } from 'framer-motion';
import './staticProductsDisplay.scss';
import panier from 'src/components/StaticProductsDisplay/Brouette.jpg';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import epicerie from './produitsVerres.jpg';
import legumes from './HaricotsVert.jpg';
import detail from './detail.jpg';
import fruits from './fraises.jpg';
import Loading from '../Loading/Loading';
import Page from '../Page/Page';

function StaticProductsDisplay() {
  const isLoadingParams = useSelector((state) => state.navigation.paramsLoading);
  const params = useParams();
  const location = useLocation();
  const { slugCategory } = params;
  const [isLocation, setisLocation] = useState(false);
  useEffect(() => {
    if (location.pathname === '/liste' || location.pathname === '/NosPaniers') {
      setisLocation(true);
    }
    return () => {
      setisLocation(false);
    };
  }, [isLocation]);
  const image = () => {
    if (location.pathname === '/NosPaniers') {
      return panier;
    }
    if (slugCategory === 'epicerie') {
      return epicerie;
    }
    if (slugCategory === 'legumes') {
      return legumes;
    }
    if (location.pathname === '/liste') {
      return detail;
    }
    if (slugCategory === 'fruits') {
      return fruits;
    }
  };
  const titleToDisplay = () => {
    if (location.pathname === '/liste') {
      return 'detail';
    }
    if (location.pathname === '/NosPaniers') {
      return 'panier';
    }
    return slugCategory;
  };
  if (isLoadingParams && !isLocation) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }
  return (
    <div className="static-container">
      <div className="static-title-container">
        <motion.div
          key={location.pathname}
          className="static-title"
          initial={{ height: 0 }}
          animate={{ height: '70%' }}
        >
          {titleToDisplay().toUpperCase()}
        </motion.div>
      </div>
      <motion.img
        key={image()}
        src={image()}
        alt="staticProduct"
        className="static-image"
        initial={{ y: window.innerHeight }}
        animate={{ y: 0, transition: { duration: 0.3 } }}
      />
      <div
        className="static-subtitle-container"
      >
        <motion.div
          className="static-subtitle"
          initial={{ x: window.innerWidth }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Fais ton choix!
        </motion.div>
      </div>
    </div>
  );
}

export default StaticProductsDisplay;
