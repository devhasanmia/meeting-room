import { baseApi } from "../../api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Slots Create Start
    createSlots: builder.mutation({
      query: (data) => ({
        url: "/slots",
        method: "POST",
        body: data,
      }),
    }),
    // Slots Create End
  }),
});

export const { useCreateSlotsMutation } = slotsApi;

