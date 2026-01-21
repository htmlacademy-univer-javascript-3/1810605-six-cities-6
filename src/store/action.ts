import { City, Offer, AuthorizationStatus, UserData } from '../types';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export const ActionType = {
  ChangeCity: 'city/change',
  LoadOffers: 'offers/load',
  SetOffersLoading: 'offers/loading',
  SetOffersLoadError: 'offers/load-error',
  ChangeSortType: 'sort/change',
  SetActiveOfferId: 'offer/active',
  SetAuthStatus: 'auth/status',
  SetUser: 'auth/user'
} as const;

export const changeCity = (city: City) => ({
  type: ActionType.ChangeCity,
  payload: city
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers
} as const);

export const setOffersLoading = (isLoading: boolean) => ({
  type: ActionType.SetOffersLoading,
  payload: isLoading
} as const);

export const setOffersLoadError = (hasError: boolean) => ({
  type: ActionType.SetOffersLoadError,
  payload: hasError
} as const);

export const changeSortType = (sortType: SortType) => ({
  type: ActionType.ChangeSortType,
  payload: sortType
} as const);

export const setActiveOfferId = (offerId: string | null) => ({
  type: ActionType.SetActiveOfferId,
  payload: offerId
} as const);

export const setAuthStatus = (status: AuthorizationStatus) => ({
  type: ActionType.SetAuthStatus,
  payload: status
} as const);

export const setUser = (user: UserData | null) => ({
  type: ActionType.SetUser,
  payload: user
} as const);

export type Action =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof setOffersLoading>
  | ReturnType<typeof setOffersLoadError>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof setActiveOfferId>
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof setUser>;
