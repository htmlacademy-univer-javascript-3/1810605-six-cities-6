import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App offers={offers} reviews={reviews} />
  </StrictMode>
);
