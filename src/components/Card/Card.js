/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import 'src/components/Card/card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { pushInCart, setCount } from '../../feature/shoppingCart.slice';
import { changeQuantityProduct } from '../../utils/cartUtils';

function Card({
  name, price, unity, quantity, onClick, slug, product, related,
}) {
  const isCreditCardLayout = useSelector((state) => state.shoppingCart.isCreditCardLayout);
  const width = useSelector((state) => state.navigation.width);
  const handleClick = () => {
    onClick(related, slug);
  };
  const dispatch = useDispatch();
  const params = useParams();
  const { slugProduct } = params;
  const products = useSelector((state) => state.shoppingCart.shoppingCart);
  const handleClickIncrementCart = () => {
    dispatch(pushInCart(changeQuantityProduct(products, product, 1)));
    dispatch(setCount(1));
  };
  const handleClickDecrementCart = () => {
    dispatch(pushInCart(changeQuantityProduct(products, product, -1)));
    dispatch(setCount(-1));
  };
  return (
    <>
      {(related === 'products' || related === 'carts') && (
      <div
        className="card-container"
      >
        <div
          className="card-article"
          onClick={handleClick}
        >
          <div className="card-leftSide">
            <h2
              className="card-leftSide card-title"
              {...((slugProduct === slug) && { style: { color: '#fd7c55' } })}
            >{name}
            </h2>
          </div>
          {width >= 1024 && (
            <>
              <div className="doted" />
              <ul className="card-infos">
                <li className="card-unity">{quantity}</li>
                <li className="card-unity">{unity === 'bouteille(s)' ? 'btl' : unity}</li>
                <li className="card-unity">/</li>
                <li className="card-price">{`${price}€`}</li>
              </ul>
            </>
          )}

        </div>
        {width < 1024 && (
        <div className="button-group">
          <button
            type="button"
            onClick={handleClickIncrementCart}
            className="card-button"
          >
            <ion-icon name="cart-outline" size="medium" />
          </button>
          <div className="doted" />
          <ul className="card-infos">
            <li className="card-unity">{quantity}</li>
            <li className="card-unity">{unity === 'bouteille(s)' ? 'btl' : unity}</li>
            <li className="card-unity">/</li>
            <li className="card-price">{`${price}€`}</li>
          </ul>
        </div>
        )}

      </div>
      )}
      {related === 'shoppingCart' && (
      <div className="card-container shoppingCart">
        <div
          className="card-article"
        >
          <div className="card-leftSide">
            <h2 className="card-leftSide card-title">{name}</h2>
          </div>
          <div className="doted" />
          <ul className="card-infos">
            <li className="card-unity">{quantity}</li>
            <li className="card-unity">{ unity === undefined ? 'Pce' : unity}</li>
            <li className="card-unity">-</li>
            <li
              className="card-price"
            >
              {`${(quantity * parseFloat(price)).toFixed(2)}€`}
            </li>
          </ul>
        </div>
        {!isCreditCardLayout && (
        <div className="button-group">
          <button
            type="button"
            onClick={handleClickDecrementCart}
            className="card-button"
          >
            <ion-icon name="remove-circle-outline" size="medium" />
          </button>
          <button
            type="button"
            onClick={handleClickIncrementCart}
            className="card-button"
          >
            <ion-icon name="add-circle-outline" size="medium" />
          </button>
          <div className="button-group-meta">
            {`${price}€/${unity === undefined ? 'Pce' : unity}`}
          </div>
        </div>
        )}

      </div>
      )}
    </>

  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  related: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  unity: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  slug: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default Card;
