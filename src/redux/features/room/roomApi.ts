import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new Room Start
    createRoom: builder.mutation({
      query: (data) => ({
        url: "/rooms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Room"],
    }),
    // Create new Room End
    // All Room Get Start
    getRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    // All Room Get End
    // Get Room By Id Start
    getRoomsById: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    // Get Room By Id end
    // Get Room By Id and Update Start
    getRoomByIdAndUpdate: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/rooms/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Room"],
    }),
    // Get Room By Id and Update End
    // Get Room By Id and Delete Start
    getRoomByIdAndDelete: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
    // Get Room By Id and Delete End
    // Get Availability Check Start
    availability: builder.query({
      query: () => ({
        url: `/slots/availability`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    // Get Availability Check End
    
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
      providesTags: ["Room"],
    }),
    availabilityById: builder.query({
      query: (id) => {
        return {
          url: `/slots/availability/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Room"],
    }),
    getRoomById: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomsByIdQuery,
  useAvailabilityQuery,
  useAvailabilitysQuery,
  useAvailabilityByIdQuery,
  useCreateRoomMutation,
  useGetRoomByIdAndUpdateMutation,
  useGetRoomByIdAndDeleteMutation,
} = roomApi;
