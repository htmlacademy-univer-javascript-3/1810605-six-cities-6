import { City, Offer } from '../types';
import { Action, ActionType, SortType } from './action';

export type State = {
  city: City;
  offers: Offer[];
  sortType: SortType;
  activeOfferId: string | null;
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
  sortType: 'Popular',
  activeOfferId: null
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload, activeOfferId: null };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    case ActionType.ChangeSortType:
      return { ...state, sortType: action.payload };
    case ActionType.SetActiveOfferId:
      return { ...state, activeOfferId: action.payload };
    default:
      return state;
  }
};
