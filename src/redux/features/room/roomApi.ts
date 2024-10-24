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

  }),
});

export const {useGetRoomsQuery} = roomApi;
