import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';  // This is an example of your reducer file

const store = configureStore({
  reducer: {
    user: userReducer,  // You can add more reducers as needed
  },
});

export default store;
