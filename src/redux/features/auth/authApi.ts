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
    }),
    // Signup End
    // Login Start
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    // Login End

    // Get All User
    getAllUser: builder.query({
      query: () => ({
        url: "/auth/all",
        method: "GET",
      }),
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
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetAllUserQuery,
  useRoleChangeMutation,
  useDeleteUserMutation
} = authApi;
