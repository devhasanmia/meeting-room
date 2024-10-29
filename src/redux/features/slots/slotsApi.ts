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
      invalidatesTags: ["Slots"],
    }),
    // Slots Create End
    // Slots Get All Start
    getSlots: builder.query({
      query: () => ({
        url: "/slots/availability",
        method: "GET",
      }),
      providesTags: ["Slots"],
    }),
    // Slots Get End
    // Slots Get by Id Start
    getSlotsById: builder.query({
      query: (id) => ({
        url: `/slots/availability/${id}`,
        method: "GET",
      }),
      providesTags: ["Slots"],
    }),
    // Slots Get by Id End
    // Slots Delete Start
    deleteSlots: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slots"],
    }),
    // Slots Delete End
    // Slots Update Start
    updateSlots: builder.mutation({
      query: ({ id, data }) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Slots"],
    }),
    // Slots Update End
  }),
});

export const {
  useCreateSlotsMutation,
  useGetSlotsQuery,
  useUpdateSlotsMutation,
  useDeleteSlotsMutation,
  useGetSlotsByIdQuery,
} = slotsApi;
