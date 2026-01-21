import { City, Offer } from '../types';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export const ActionType = {
  ChangeCity: 'city/change',
  LoadOffers: 'offers/load',
  ChangeSortType: 'sort/change',
  SetActiveOfferId: 'offer/active'
} as const;

export const changeCity = (city: City) => ({
  type: ActionType.ChangeCity,
  payload: city
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers
} as const);

export const changeSortType = (sortType: SortType) => ({
  type: ActionType.ChangeSortType,
  payload: sortType
} as const);

export const setActiveOfferId = (offerId: string | null) => ({
  type: ActionType.SetActiveOfferId,
  payload: offerId
} as const);

export type Action =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof setActiveOfferId>;
