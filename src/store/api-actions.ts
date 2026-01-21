import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, UserData, AuthorizationStatus } from '../types';
import { Action, loadOffers, setOffersLoadError, setOffersLoading, setAuthStatus, setUser } from './action';
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
