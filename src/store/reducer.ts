import { City, Offer, AuthorizationStatus, UserData, Review } from '../types';
import { Action, ActionType, SortType } from './action';

export type State = {
  city: City;
  offers: Offer[];
  isOffersLoading: boolean;
  isOffersLoadError: boolean;
  offer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
  isNearbyOffersLoading: boolean;
  isCommentsLoading: boolean;
  isCommentPosting: boolean;
  isCommentPostError: boolean;
  sortType: SortType;
  activeOfferId: string | null;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export const DEFAULT_CITY: City = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499
  }
};

export const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  isOffersLoadError: false,
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isOfferNotFound: false,
  isNearbyOffersLoading: false,
  isCommentsLoading: false,
  isCommentPosting: false,
  isCommentPostError: false,
  sortType: 'Popular',
  activeOfferId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload, activeOfferId: null };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetOffer:
      return { ...state, offer: action.payload };
    case ActionType.SetNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.SetComments:
      return { ...state, comments: action.payload };
    case ActionType.SetOffersLoading:
      return { ...state, isOffersLoading: action.payload };
    case ActionType.SetOffersLoadError:
      return { ...state, isOffersLoadError: action.payload };
    case ActionType.SetOfferLoading:
      return { ...state, isOfferLoading: action.payload };
    case ActionType.SetOfferNotFound:
      return { ...state, isOfferNotFound: action.payload };
    case ActionType.SetNearbyOffersLoading:
      return { ...state, isNearbyOffersLoading: action.payload };
    case ActionType.SetCommentsLoading:
      return { ...state, isCommentsLoading: action.payload };
    case ActionType.SetCommentPosting:
      return { ...state, isCommentPosting: action.payload };
    case ActionType.SetCommentPostError:
      return { ...state, isCommentPostError: action.payload };
    case ActionType.ChangeSortType:
      return { ...state, sortType: action.payload };
    case ActionType.SetActiveOfferId:
      return { ...state, activeOfferId: action.payload };
    case ActionType.SetAuthStatus:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.SetUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
