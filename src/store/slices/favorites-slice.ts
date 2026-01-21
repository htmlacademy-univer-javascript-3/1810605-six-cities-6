import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types';

export type FavoritesState = {
  items: Offer[];
};

const initialState: FavoritesState = {
  items: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Offer[]>) => {
      state.items = action.payload;
    }
  }
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
