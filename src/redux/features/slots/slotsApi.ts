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
    // Slots Get All Start
    getSlots: builder.query({
      query: () => ({
        url: "/slots/availability",
        method: "GET",
      }),
    }),
    // Slots Get End
    // Slots Get by Id Start
    getSlotsById: builder.query({
      query: (id) => ({
        url: `/slots/availability/${id}`,
        method: "GET",
      }),
    }),
    // Slots Get by Id End
    // Slots Delete Start
    deleteSlots: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
    }),
    // Slots Delete End
    // Slots Update Start
    updateSlots: builder.mutation({
      query: ({ id, data }) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // Slots Update End
  }),
});

export const {
  useCreateSlotsMutation,
  useGetSlotsQuery,
  useUpdateSlotsMutation,
  useDeleteSlotsMutation,
  useGetSlotsByIdQuery
} = slotsApi;
