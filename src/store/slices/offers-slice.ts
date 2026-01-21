import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offer } from '../../types';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export type OffersState = {
  city: City;
  items: Offer[];
  isLoading: boolean;
  hasError: boolean;
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

const initialState: OffersState = {
  city: DEFAULT_CITY,
  items: [],
  isLoading: false,
  hasError: false,
  sortType: 'Popular',
  activeOfferId: null
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.activeOfferId = null;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.items = action.payload;
    },
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOffersLoadError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setActiveOfferId: (state, action: PayloadAction<string | null>) => {
      state.activeOfferId = action.payload;
    }
  }
});

export const {
  changeCity,
  loadOffers,
  setOffersLoading,
  setOffersLoadError,
  changeSortType,
  setActiveOfferId
} = offersSlice.actions;

export default offersSlice.reducer;
