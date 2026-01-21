import { City, Offer } from '../types';
import { Action, ActionType } from './action';

export type State = {
  city: City;
  offers: Offer[];
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
  offers: []
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    default:
      return state;
  }
};
