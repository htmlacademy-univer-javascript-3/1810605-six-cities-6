import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, UserData } from '../../types';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    }
  }
});

export const { setAuthStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
