import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, UserData, AuthorizationStatus, Review } from '../types';
import {
  Action,
  loadOffers,
  setOffersLoadError,
  setOffersLoading,
  setAuthStatus,
  setUser,
  setOffer,
  setOfferLoading,
  setOfferNotFound,
  setNearbyOffers,
  setNearbyOffersLoading,
  setComments,
  setCommentsLoading,
  setCommentPosting,
  setCommentPostError
} from './action';
import { RootState } from './index';
import { saveToken, dropToken } from '../services/token';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  AxiosInstance,
  Action
>;

const normalizeOffer = (offer: Offer): Offer => {
  const images = Array.isArray(offer.images) ? offer.images : [];
  const goods = Array.isArray(offer.goods) ? offer.goods : [];

  return {
    ...offer,
    images,
    goods,
    host: {
      name: offer.host?.name ?? '',
      avatarUrl: offer.host?.avatarUrl ?? '',
      isPro: offer.host?.isPro ?? false
    },
    isPremium: offer.isPremium ?? false,
    isFavorite: offer.isFavorite ?? false,
    previewImage: offer.previewImage ?? images[0] ?? ''
  };
};

export const fetchOffersAction = (): AppThunk => async (dispatch, _getState, api) => {
  dispatch(setOffersLoading(true));
  dispatch(setOffersLoadError(false));
  try {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(loadOffers(data.map(normalizeOffer)));
  } catch (error) {
    dispatch(setOffersLoadError(true));
  } finally {
    dispatch(setOffersLoading(false));
  }
};

export const fetchOfferAction = (offerId: string): AppThunk => async (dispatch, _getState, api) => {
  dispatch(setOfferLoading(true));
  dispatch(setOfferNotFound(false));
  try {
    const { data } = await api.get<Offer>(`/offers/${offerId}`);
    dispatch(setOffer(normalizeOffer(data)));
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 404) {
      dispatch(setOfferNotFound(true));
    }
    dispatch(setOffer(null));
  } finally {
    dispatch(setOfferLoading(false));
  }
};

export const fetchNearbyOffersAction = (offerId: string): AppThunk => async (dispatch, _getState, api) => {
  dispatch(setNearbyOffersLoading(true));
  try {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    dispatch(setNearbyOffers(data.map(normalizeOffer)));
  } finally {
    dispatch(setNearbyOffersLoading(false));
  }
};

export const fetchCommentsAction = (offerId: string): AppThunk => async (dispatch, _getState, api) => {
  dispatch(setCommentsLoading(true));
  try {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    dispatch(setComments(Array.isArray(data) ? data : []));
  } finally {
    dispatch(setCommentsLoading(false));
  }
};

export const postCommentAction = (params: { offerId: string; comment: string; rating: number }): AppThunk =>
  async (dispatch, _getState, api) => {
    dispatch(setCommentPosting(true));
    dispatch(setCommentPostError(false));
    try {
      const { data } = await api.post<Review[]>(`/comments/${params.offerId}`, {
        comment: params.comment,
        rating: params.rating
      });
      if (Array.isArray(data)) {
        dispatch(setComments(data));
      } else {
        dispatch(fetchCommentsAction(params.offerId));
      }
    } catch (error) {
      dispatch(setCommentPostError(true));
      throw error;
    } finally {
      dispatch(setCommentPosting(false));
    }
  };

export const checkAuthAction = (): AppThunk => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get<UserData>('/login');
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  }
};

export const loginAction = (credentials: { email: string; password: string }): AppThunk =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<UserData>('/login', credentials);
      saveToken(data.token);
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      throw error;
    }
  };

export const logoutAction = (): AppThunk => async (dispatch, _getState, api) => {
  try {
    await api.delete('/logout');
  } finally {
    dropToken();
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
};
