import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create New Booking Start
    createBookings: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    // Create New Booking End
    // My Booking Start
    myBookings: builder.query({
      query: () => ({
        url: `/my-bookings`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    // My Booking End
    // Get All Booking Query Start
    getAllbookings: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    // Get All Booking Query End
    // Booking Status Update Start
    bookingStatusUpdate: builder.mutation({
      query: ({ id, isConfirmed }) => {
        return {
          url: `/bookings/${id}`,
          method: "PUT",
          body: { isConfirmed },
        };
      },
      invalidatesTags: ["Booking"],
    }),
    // Booking Status Update End
    // Booking Delete Start
    bookingDelete: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Booking"],
    }),
    // Booking Delete End
  }),
});

export const {
  useGetAllbookingsQuery,
  useBookingStatusUpdateMutation,
  useBookingDeleteMutation,
  useCreateBookingsMutation,
  useMyBookingsQuery
} = bookingApi;
