import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export type UserState = {
  user?: User,
};

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>)  => {
        const tempUser = action.payload;

        state.user = {
          ...tempUser
        };
        return state;
    },
    unsetUser: (state) =>{
      state.user = undefined;
      return state;
    }
  },
});

export const {setUser, unsetUser} = userSlice.actions;

export default userSlice.reducer;