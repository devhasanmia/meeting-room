import { baseApi } from "../../api/baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup Start
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Signup End
    // Login Start
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Login End

    // Get All User
    getAllUser: builder.query({
      query: () => ({
        url: "/auth/all",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // Get All User End
    // Role Change Start
    roleChange: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/auth/${id}`,
          method: "PUT",
          body: { role },
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetAllUserQuery,
  useRoleChangeMutation,
  useDeleteUserMutation,
} = authApi;
