import { City, Offer, AuthorizationStatus, UserData } from '../types';
import { Action, ActionType, SortType } from './action';

export type State = {
  city: City;
  offers: Offer[];
  isOffersLoading: boolean;
  isOffersLoadError: boolean;
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
    case ActionType.SetOffersLoading:
      return { ...state, isOffersLoading: action.payload };
    case ActionType.SetOffersLoadError:
      return { ...state, isOffersLoadError: action.payload };
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
