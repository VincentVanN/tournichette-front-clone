import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'src/components/App/App';
import store from 'src/app/store';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

const rootReactElement = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
