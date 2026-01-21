import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { store } from './store';
import { loadOffers } from './store/action';

const root = createRoot(document.getElementById('root')!);

store.dispatch(loadOffers(offers));

root.render(
  <StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews} />
    </Provider>
  </StrictMode>
);
