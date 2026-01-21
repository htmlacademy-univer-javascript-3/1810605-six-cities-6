import { City, Offer, AuthorizationStatus, UserData, Review } from '../types';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export const ActionType = {
  ChangeCity: 'city/change',
  LoadOffers: 'offers/load',
  SetOffer: 'offer/load',
  SetNearbyOffers: 'offer/nearby/load',
  SetComments: 'comments/load',
  SetOffersLoading: 'offers/loading',
  SetOffersLoadError: 'offers/load-error',
  SetOfferLoading: 'offer/loading',
  SetOfferNotFound: 'offer/not-found',
  SetNearbyOffersLoading: 'offer/nearby/loading',
  SetCommentsLoading: 'comments/loading',
  SetCommentPosting: 'comments/posting',
  SetCommentPostError: 'comments/post-error',
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

export const setOffer = (offer: Offer | null) => ({
  type: ActionType.SetOffer,
  payload: offer
} as const);

export const setNearbyOffers = (offers: Offer[]) => ({
  type: ActionType.SetNearbyOffers,
  payload: offers
} as const);

export const setComments = (comments: Review[]) => ({
  type: ActionType.SetComments,
  payload: comments
} as const);

export const setOffersLoading = (isLoading: boolean) => ({
  type: ActionType.SetOffersLoading,
  payload: isLoading
} as const);

export const setOffersLoadError = (hasError: boolean) => ({
  type: ActionType.SetOffersLoadError,
  payload: hasError
} as const);

export const setOfferLoading = (isLoading: boolean) => ({
  type: ActionType.SetOfferLoading,
  payload: isLoading
} as const);

export const setOfferNotFound = (isNotFound: boolean) => ({
  type: ActionType.SetOfferNotFound,
  payload: isNotFound
} as const);

export const setNearbyOffersLoading = (isLoading: boolean) => ({
  type: ActionType.SetNearbyOffersLoading,
  payload: isLoading
} as const);

export const setCommentsLoading = (isLoading: boolean) => ({
  type: ActionType.SetCommentsLoading,
  payload: isLoading
} as const);

export const setCommentPosting = (isPosting: boolean) => ({
  type: ActionType.SetCommentPosting,
  payload: isPosting
} as const);

export const setCommentPostError = (hasError: boolean) => ({
  type: ActionType.SetCommentPostError,
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
  | ReturnType<typeof setOffer>
  | ReturnType<typeof setNearbyOffers>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setOffersLoading>
  | ReturnType<typeof setOffersLoadError>
  | ReturnType<typeof setOfferLoading>
  | ReturnType<typeof setOfferNotFound>
  | ReturnType<typeof setNearbyOffersLoading>
  | ReturnType<typeof setCommentsLoading>
  | ReturnType<typeof setCommentPosting>
  | ReturnType<typeof setCommentPostError>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof setActiveOfferId>
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof setUser>;
