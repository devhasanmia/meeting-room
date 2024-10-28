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
      })
    })
    // Get All User End
    

  }),
});

export const { useSignupMutation, useLoginMutation, useGetAllUserQuery } = authApi;
