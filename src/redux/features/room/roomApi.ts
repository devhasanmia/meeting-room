import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // All Room Get Start
    getRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
    }),
    // All Room Get End
    createRoom: builder.mutation({
      query: (data) => ({
        url: "/rooms",
        method: "POST",
        body: data,
      }),
    }),
    getRoomsById: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
    }),
    getRoomByIdAndDelete: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
    }),
    getRoomByIdAndUpdate: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/rooms/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    availability: builder.query({
      query: () => ({
        url: `/slots/availability`,
        method: "GET",
      }),
    }),

    availabilitys: builder.query({
      query: ({ date, room }) => {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (room) params.append("room", room);
        return {
          url: `/slots/availabilitys?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    availabilityById: builder.query({
      query: (id) => {
        return {
          url: `/slots/availability/${id}`,
          method: "GET",
        };
      },
    }),
    roomsById: builder.query({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
    }),
    bookings: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
    }),

    getAllbookings: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET",
      }),
    }),
    roomBookingStatusUpdate: builder.mutation({
      query: ({ id, isConfirmed }) => {
        console.log({ ID: id, IsConfirmed: isConfirmed });
        return {
          url: `/bookings/${id}`,
          method: "PUT",
          body: { isConfirmed },
        };
      },
    }),
    bookingRoomDelete: builder.mutation({
      query: (id) => {
        console.log(id)
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
    }),

    myBookings: builder.query({
      query: () => ({
        url: `/my-bookings`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMyBookingsQuery,
  useGetRoomsQuery,
  useGetRoomsByIdQuery,
  useAvailabilityQuery,
  useAvailabilitysQuery,
  useBookingsMutation,
  useAvailabilityByIdQuery,
  useRoomsByIdQuery,
  useCreateRoomMutation,
  useGetAllbookingsQuery,
  useGetRoomByIdAndUpdateMutation,
  useGetRoomByIdAndDeleteMutation,
  useRoomBookingStatusUpdateMutation,
  useBookingRoomDeleteMutation
} = roomApi;
