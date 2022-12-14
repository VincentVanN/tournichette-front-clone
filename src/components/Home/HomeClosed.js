import { useSelector } from 'react-redux';
import logo from 'src/assets/logo.svg';
import Page from '../Page/Page';
import SocialNetwork from '../SocialNetwork/SocialNetwork';

function HomeClosed() {
  const name = useSelector((state) => state.user.user.firstname);
  return (
    <Page>
      <div className="home-container">
        <div className="home">
          <img className="home-logo" src={logo} alt="logo Tournichette" />
          <div className="home-annoncement-closed">
            <div className="home-hello">
              {`Hello ${name}!`}
            </div>
            Les ventes ventes sont actuellement fermées, un email te sera envoyé à l'ouverture!
          </div>
          <SocialNetwork widthDiv="30%" />
        </div>
      </div>
    </Page>
  );
}

export default HomeClosed;
