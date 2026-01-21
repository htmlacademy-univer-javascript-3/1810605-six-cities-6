import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from '../private-route';
import offersReducer, { DEFAULT_CITY } from '../../../store/slices/offers-slice';
import userReducer from '../../../store/slices/user-slice';
import offerReducer from '../../../store/slices/offer-slice';
import favoritesReducer from '../../../store/slices/favorites-slice';
import { AuthorizationStatus } from '../../../types';

const makeStore = (authorizationStatus: AuthorizationStatus) =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      offer: offerReducer,
      favorites: favoritesReducer
    },
    preloadedState: {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus,
        user: null
      },
      offer: {
        offer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
        isOfferNotFound: false,
        isNearbyOffersLoading: false,
        isCommentsLoading: false,
        isCommentPosting: false,
        isCommentPostError: false
      },
      favorites: { items: [] }
    }
  });

describe('PrivateRoute', () => {
  it('renders children when authorized', () => {
    const store = makeStore(AuthorizationStatus.Auth);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/private" element={<PrivateRoute><div>Private</div></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  it('redirects to /login when not authorized', () => {
    const store = makeStore(AuthorizationStatus.NoAuth);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/private" element={<PrivateRoute><div>Private</div></PrivateRoute>} />
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders spinner when status unknown', () => {
    const store = makeStore(AuthorizationStatus.Unknown);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/private" element={<PrivateRoute><div>Private</div></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
