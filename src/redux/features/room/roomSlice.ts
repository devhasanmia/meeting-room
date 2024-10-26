import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: null,
  user: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    booking: (state, action) => {
      const { room, user } = action.payload;
      state.room = room;
      state.user = user;
    },
  },
});

export const { booking } = bookingSlice.actions;
export default bookingSlice.reducer;
