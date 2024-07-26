// src/slices/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      return state.filter(notification => notification.id !== action.payload);
    },
    clearNotifications: () => {
      return [];
    }
  }
});

export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
