import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../types';
import offersReducer, { DEFAULT_CITY } from '../../../store/slices/offers-slice';
import userReducer from '../../../store/slices/user-slice';
import offerReducer from '../../../store/slices/offer-slice';
import favoritesReducer from '../../../store/slices/favorites-slice';
import App from '../app';

let mockEntries: string[] = ['/'];

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <actual.MemoryRouter initialEntries={mockEntries}>{children}</actual.MemoryRouter>
    )
  };
});

vi.mock('../../../store/api-actions', () => ({
  checkAuthAction: () => ({ type: 'checkAuth' }),
  fetchOffersAction: () => ({ type: 'fetchOffers' }),
  fetchFavoritesAction: () => ({ type: 'fetchFavorites' }),
  fetchOfferAction: () => ({ type: 'fetchOffer' }),
  fetchNearbyOffersAction: () => ({ type: 'fetchNearby' }),
  fetchCommentsAction: () => ({ type: 'fetchComments' })
}));

const renderWithProviders = (route: string, preloadedState?: object) => {
  mockEntries = [route];
  const store = configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      offer: offerReducer,
      favorites: favoritesReducer
    },
    preloadedState
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App routing', () => {
  it('renders MainPage on "/"', () => {
    renderWithProviders('/', {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
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
    });

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('renders LoginPage on "/login"', () => {
    renderWithProviders('/login', {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
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
    });

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('redirects "/favorites" to "/login" when NoAuth', () => {
    renderWithProviders('/favorites', {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
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
    });

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders FavoritesPage on "/favorites" when Auth', () => {
    renderWithProviders('/favorites', {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.local', token: 'token', avatarUrl: '/img/a.jpg', isPro: false }
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
    });

    expect(screen.getByText(/saved listing/i)).toBeInTheDocument();
  });

  it('renders OfferPage on "/offer/:id"', () => {
    renderWithProviders('/offer/1', {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      },
      offer: {
        offer: {
          id: '1',
          title: 'Test Offer',
          type: 'apartment',
          price: 120,
          rating: 4.5,
          isPremium: false,
          isFavorite: false,
          previewImage: '/img/test.jpg',
          location: { latitude: 1, longitude: 1 },
          city: DEFAULT_CITY,
          bedrooms: 1,
          maxAdults: 2,
          description: 'Test',
          goods: [],
          host: { name: 'Host', avatarUrl: '/img/a.jpg', isPro: false },
          images: []
        },
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
    });

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    renderWithProviders('/unknown', {
      offers: {
        city: DEFAULT_CITY,
        items: [],
        isLoading: false,
        hasError: false,
        sortType: 'Popular',
        activeOfferId: null
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
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
    });

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
