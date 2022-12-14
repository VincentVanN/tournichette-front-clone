/* eslint-disable max-len */
import './products.scss';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import Card from 'src/components/Card/Card';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Page from '../Page/Page';
import Loading from '../Loading/Loading';
import SearchBar from '../SearchBar/SearchBar';
import { setLocalStorageCurrentProduct } from '../../utils/localStorage';

function Products() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { slugCategory, slugProduct, slugCart } = params;
  //
  // pickup data
  //
  const products = useSelector((state) => state.products.products.data);
  const categories = useSelector((state) => state.products.categories.data);
  const carts = useSelector((state) => state.products.carts.data);
  //
  // booleen for conditional loading display
  //
  const isLoadingProducts = useSelector((state) => state.products.loadingProducts);
  const isLoadingCategories = useSelector((state) => state.products.loadingCategories);
  const isLoadingCarts = useSelector((state) => state.products.loadingCarts);
  //
  // algorithm to filter products by category
  //
  const filterProducts = () => products
    .filter((product) => (product.category.slug === slugCategory));

  let filteredArray;
  if (Object.keys(params).length === 0 || location.pathname === '/liste' || slugProduct) {
    filteredArray = products;
  }
  if (slugCart || location.pathname === '/NosPaniers') {
    filteredArray = carts;
  }
  if (slugCategory || (slugCategory && slugProduct)) {
    filteredArray = filterProducts();
  }
  // algorithm to filter products by search bar
  //
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (item) => (setSearchTerm(item));
  let arrayToDisplay;
  if (searchTerm) {
    arrayToDisplay = filteredArray
      .filter((value) => (value.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }
  else {
    arrayToDisplay = filteredArray;
  }
  //
  // element for product display
  //
  const selectedRoute = (related, slug) => {
    if (related === 'products' && slugCategory) {
      return { path: `/categorie/${slugCategory}/${slug}`, type: 'category' };
    }
    if (related === 'carts') {
      return { path: `/paniers/${slug}`, type: 'carts' };
    }
    return { path: `/produit/${slug}`, type: 'products' };
  };
  const productToDisplay = (related, slug) => {
    const product = related === 'carts' ? carts.find((item) => item.slug === slug) : products.find((item) => item.slug === slug);
    const { type } = selectedRoute(related, slug);
    const productObject = { product, arrayToDisplay, type };
    return productObject;
  };

  const handleClickProduct = (related, slug) => {
    setLocalStorageCurrentProduct(productToDisplay(related, slug));
    navigate(selectedRoute(related, slug).path, { state: { currentProduct: productToDisplay(related, slug) } });
  };
  //
  // display for searchBar
  //
  const [isSearchBar, setIsSearchBar] = useState(false);
  const setHiddenSearchBar = !isSearchBar ? 'hidden' : '';
  const handleClick = () => {
    setIsSearchBar(!isSearchBar);
  };
  //
  // send a parent to card
  //
  const related = () => {
    if (slugCart || location.pathname === '/NosPaniers') {
      return 'carts';
    }
    return 'products';
  };
  //
  if ((isLoadingProducts || isLoadingCategories || isLoadingCarts)) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }
  return (
    <div
      className="products-container"
    >
      <header className="products-header">
        {(location.pathname === '/NosPaniers' || slugCart) && (<h1 className="title"> Nos paniers de saison</h1>)}
        {((location.pathname === '/liste' || slugProduct || location.pathname.includes('/categorie')) && (
          <>
            <div className="products-searchBar">
              <SearchBar
                type="text"
                placeholder="Rechercher..."
                className={`products-searchBar-input ${setHiddenSearchBar}`}
                onChange={handleChange}
              />
              <ion-icon
                className="products-searchBar-icon"
                name="search-outline"
                onClick={handleClick}
              />
            </div>
            <div className="products-categories">
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  className="products-categoryName"
                  to={`/categorie/${category.slug}`}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </>
        ))}
      </header>

      <div
        className="products"
      >
        <ul className="products-items">
          {arrayToDisplay.map((product) => (
            <Card
              related={related()}
              key={product.name}
              onClick={handleClickProduct}
              name={product.name}
              image={product.image}
              price={product.price}
              unity={product.unity}
              quantity={product.quantity}
              slug={product.slug}
              product={product}
              id={product.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Products;
