import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: null,
  user: null,
  date: null,
  slots: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingReduxStore: (state, action) => {
      const { room, user, date, slots } = action.payload;
      state.date = date;
      state.slots = slots;
      state.room = room;
      state.user = user;
    },
  },
});

export const { bookingReduxStore } = bookingSlice.actions;
export default bookingSlice.reducer;
