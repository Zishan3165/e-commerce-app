import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;