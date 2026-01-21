import { City, Offer } from '../types';

export const ActionType = {
  ChangeCity: 'city/change',
  LoadOffers: 'offers/load'
} as const;

export const changeCity = (city: City) => ({
  type: ActionType.ChangeCity,
  payload: city
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers
} as const);

export type Action =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>;
