import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReviewForm from '../review-form';
import offersReducer, { DEFAULT_CITY } from '../../../store/slices/offers-slice';
import userReducer from '../../../store/slices/user-slice';
import offerReducer from '../../../store/slices/offer-slice';
import favoritesReducer from '../../../store/slices/favorites-slice';

vi.mock('../../../store/api-actions', () => ({
  postCommentAction: (payload: { offerId: string; comment: string; rating: number }) => ({
    type: 'postComment',
    payload
  })
}));

const makeStore = () =>
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
        authorizationStatus: 'NO_AUTH',
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

describe('ReviewForm', () => {
  it('dispatches postCommentAction on submit', async () => {
    const store = makeStore();
    const spy = vi.spyOn(store, 'dispatch');
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    await user.click(screen.getByTitle('perfect'));
    await user.type(
      screen.getByPlaceholderText(/tell how was your stay/i),
      'a'.repeat(60)
    );
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(spy).toHaveBeenCalledWith({
      type: 'postComment',
      payload: { offerId: '1', comment: 'a'.repeat(60), rating: 5 }
    });
  });
});
