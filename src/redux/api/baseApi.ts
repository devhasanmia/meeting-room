import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://meeting-room-booking-system-one.vercel.app/api",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  // automated-refetching
  tagTypes: ["User", "Room", "Slots", "Booking"],
  endpoints: () => ({}),
});
