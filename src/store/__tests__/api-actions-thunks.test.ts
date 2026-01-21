import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  checkAuthAction,
  loginAction,
  logoutAction
} from '../api-actions';
import {
  loadOffers,
  setOffersLoadError,
  setOffersLoading
} from '../slices/offers-slice';
import {
  setOffer,
  setOfferLoading,
  setOfferNotFound,
  setNearbyOffers,
  setNearbyOffersLoading,
  setComments,
  setCommentsLoading,
  setCommentPosting,
  setCommentPostError
} from '../slices/offer-slice';
import { setAuthStatus, setUser } from '../slices/user-slice';
import { setFavorites } from '../slices/favorites-slice';
import { AuthorizationStatus, Offer, Review, UserData } from '../../types';
import { RootState } from '../index';

vi.mock('../../services/token', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn()
}));

const createApiMock = () => ({
  get: vi.fn(),
  post: vi.fn(),
  delete: vi.fn()
});

type ThunkFn = (dispatch: (action: unknown) => unknown, getState: () => RootState, api: AxiosInstance) => Promise<unknown> | void;

const runThunk = async (thunk: ThunkFn, api: AxiosInstance) => {
  const actions: unknown[] = [];
  const dispatch = (action: unknown) => {
    actions.push(action);
    return action;
  };
  try {
    await thunk(dispatch, (() => ({} as RootState)), api);
  } catch {
    // ignore errors for rejected cases
  }
  return actions;
};

describe('api-actions thunks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchOffersAction: fulfilled', async () => {
    const api = createApiMock();
    const offer: Offer = {
      id: '1',
      title: 'Test',
      type: 'apartment',
      price: 120,
      rating: 4.5,
      isPremium: false,
      isFavorite: true,
      previewImage: '/img/test.jpg',
      location: { latitude: 1, longitude: 1 },
      city: { name: 'Paris', location: { latitude: 1, longitude: 1 } },
      bedrooms: 1,
      maxAdults: 2,
      description: 'Test',
      goods: [],
      host: { name: 'Host', avatarUrl: '/img/a.jpg', isPro: false },
      images: []
    };
    api.get.mockResolvedValue({ data: [offer] });

    const actions = await runThunk(fetchOffersAction(), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setOffersLoading(true),
      setOffersLoadError(false),
      loadOffers([offer]),
      setOffersLoading(false)
    ]);
  });

  it('fetchOffersAction: rejected', async () => {
    const api = createApiMock();
    api.get.mockRejectedValue(new Error('fail'));

    const actions = await runThunk(fetchOffersAction(), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setOffersLoading(true),
      setOffersLoadError(false),
      setOffersLoadError(true),
      setOffersLoading(false)
    ]);
  });

  it('fetchOfferAction: fulfilled', async () => {
    const api = createApiMock();
    const offer: Offer = {
      id: '1',
      title: 'Test',
      type: 'apartment',
      price: 120,
      rating: 4.5,
      isPremium: false,
      isFavorite: false,
      previewImage: '/img/test.jpg',
      location: { latitude: 1, longitude: 1 },
      city: { name: 'Paris', location: { latitude: 1, longitude: 1 } },
      bedrooms: 1,
      maxAdults: 2,
      description: 'Test',
      goods: [],
      host: { name: 'Host', avatarUrl: '/img/a.jpg', isPro: false },
      images: []
    };
    api.get.mockResolvedValue({ data: offer });

    const actions = await runThunk(fetchOfferAction('1'), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setOfferLoading(true),
      setOfferNotFound(false),
      setOffer(offer),
      setOfferLoading(false)
    ]);
  });

  it('fetchOfferAction: 404', async () => {
    const api = createApiMock();
    const error = { response: { status: 404 } };
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    api.get.mockRejectedValue(error);

    const actions = await runThunk(fetchOfferAction('1'), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setOfferLoading(true),
      setOfferNotFound(false),
      setOfferNotFound(true),
      setOffer(null),
      setOfferLoading(false)
    ]);
  });

  it('fetchNearbyOffersAction: fulfilled', async () => {
    const api = createApiMock();
    const offer: Offer = {
      id: '2',
      title: 'Near',
      type: 'room',
      price: 80,
      rating: 4,
      isPremium: false,
      isFavorite: false,
      previewImage: '/img/test.jpg',
      location: { latitude: 1, longitude: 1 },
      city: { name: 'Paris', location: { latitude: 1, longitude: 1 } },
      bedrooms: 1,
      maxAdults: 2,
      description: 'Test',
      goods: [],
      host: { name: 'Host', avatarUrl: '/img/a.jpg', isPro: false },
      images: []
    };
    api.get.mockResolvedValue({ data: [offer] });

    const actions = await runThunk(fetchNearbyOffersAction('1'), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setNearbyOffersLoading(true),
      setNearbyOffers([offer]),
      setNearbyOffersLoading(false)
    ]);
  });

  it('fetchNearbyOffersAction: rejected', async () => {
    const api = createApiMock();
    api.get.mockRejectedValue(new Error('fail'));

    const actions = await runThunk(fetchNearbyOffersAction('1'), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setNearbyOffersLoading(true),
      setNearbyOffersLoading(false)
    ]);
  });

  it('fetchCommentsAction: fulfilled', async () => {
    const api = createApiMock();
    const comments: Review[] = [{
      id: '1',
      comment: 'Nice',
      date: '2020-01-01',
      rating: 4,
      user: { name: 'User', avatarUrl: '/img/a.jpg', isPro: false }
    }];
    api.get.mockResolvedValue({ data: comments });

    const actions = await runThunk(fetchCommentsAction('1'), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setCommentsLoading(true),
      setComments(comments),
      setCommentsLoading(false)
    ]);
  });

  it('fetchCommentsAction: rejected', async () => {
    const api = createApiMock();
    api.get.mockRejectedValue(new Error('fail'));

    const actions = await runThunk(fetchCommentsAction('1'), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setCommentsLoading(true),
      setCommentsLoading(false)
    ]);
  });

  it('postCommentAction: fulfilled', async () => {
    const api = createApiMock();
    const comments: Review[] = [{
      id: '1',
      comment: 'Nice',
      date: '2020-01-01',
      rating: 4,
      user: { name: 'User', avatarUrl: '/img/a.jpg', isPro: false }
    }];
    api.post.mockResolvedValue({ data: comments });

    const actions = await runThunk(
      postCommentAction({ offerId: '1', comment: 'Nice', rating: 4 }),
      api as unknown as AxiosInstance
    );

    expect(actions).toEqual([
      setCommentPosting(true),
      setCommentPostError(false),
      setComments(comments),
      setCommentPosting(false)
    ]);
  });

  it('postCommentAction: rejected', async () => {
    const api = createApiMock();
    api.post.mockRejectedValue(new Error('fail'));

    const actions = await runThunk(
      postCommentAction({ offerId: '1', comment: 'Nice', rating: 4 }),
      api as unknown as AxiosInstance
    );

    expect(actions).toEqual([
      setCommentPosting(true),
      setCommentPostError(false),
      setCommentPostError(true),
      setCommentPosting(false)
    ]);
  });

  it('checkAuthAction: fulfilled', async () => {
    const api = createApiMock();
    const user: UserData = {
      email: 'test@test.local',
      token: 'token',
      avatarUrl: '/img/a.jpg',
      isPro: false
    };
    api.get.mockResolvedValue({ data: user });

    const actions = await runThunk(checkAuthAction(), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setAuthStatus(AuthorizationStatus.Auth),
      setUser(user)
    ]);
  });

  it('checkAuthAction: rejected', async () => {
    const api = createApiMock();
    api.get.mockRejectedValue(new Error('fail'));

    const actions = await runThunk(checkAuthAction(), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setAuthStatus(AuthorizationStatus.NoAuth)
    ]);
  });

  it('loginAction: fulfilled', async () => {
    const api = createApiMock();
    const user: UserData = {
      email: 'test@test.local',
      token: 'token',
      avatarUrl: '/img/a.jpg',
      isPro: false
    };
    api.post.mockResolvedValue({ data: user });

    const actions = await runThunk(
      loginAction({ email: 'test@test.local', password: 'pass1' }),
      api as unknown as AxiosInstance
    );

    expect(actions).toEqual([
      setAuthStatus(AuthorizationStatus.Auth),
      setUser(user)
    ]);
  });

  it('loginAction: rejected', async () => {
    const api = createApiMock();
    api.post.mockRejectedValue(new Error('fail'));

    const actions = await runThunk(
      loginAction({ email: 'test@test.local', password: 'pass1' }),
      api as unknown as AxiosInstance
    );

    expect(actions).toEqual([setAuthStatus(AuthorizationStatus.NoAuth)]);
  });

  it('logoutAction: fulfilled', async () => {
    const api = createApiMock();
    api.delete.mockResolvedValue({});

    const actions = await runThunk(logoutAction(), api as unknown as AxiosInstance);

    expect(actions).toEqual([
      setAuthStatus(AuthorizationStatus.NoAuth),
      setUser(null),
      setFavorites([])
    ]);
  });
});
