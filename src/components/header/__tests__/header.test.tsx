import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../header';
import offersReducer, { DEFAULT_CITY } from '../../../store/slices/offers-slice';
import userReducer from '../../../store/slices/user-slice';
import offerReducer from '../../../store/slices/offer-slice';
import favoritesReducer from '../../../store/slices/favorites-slice';
import { AuthorizationStatus } from '../../../types';

vi.mock('../../../store/api-actions', () => ({
  logoutAction: () => ({ type: 'logout' })
}));

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
        user: authorizationStatus === AuthorizationStatus.Auth
          ? { email: 'test@test.local', token: 'token', avatarUrl: '/img/a.jpg', isPro: false }
          : null
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

describe('Header', () => {
  it('shows login link for NoAuth', () => {
    const store = makeStore(AuthorizationStatus.NoAuth);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('dispatches logout on Sign out click', async () => {
    const store = makeStore(AuthorizationStatus.Auth);
    const spy = vi.spyOn(store, 'dispatch');
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /sign out/i }));
    expect(spy).toHaveBeenCalledWith({ type: 'logout' });
  });
});
