import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../user/authSlice";

const userApi = createApi({
  reducerPath: "api/users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/users",
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userData) => {
        return {
          url: "/signup",
          method: "POST",
          credentials: "include",
          body: userData,
        };
      },
    }),
    verifyUser: builder.mutation({
      query: (token) => {
        return {
          url: "/verify-email",
          method: "POST",
          credentials: "include",
          body: { token },
        };
      },
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: "/login",
          method: "POST",
          credentials: "include",
          body: { email, password },
        };
      },
    }),
    getUser: builder.query({
      query() {
        return {
          url: "/get-user",
          method: "GET",
          credentials: "include",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const user = data;
        dispatch(setUser(user));
      },
    }),
  }),
});

export default userApi;
export const {
  useSignupUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
} = userApi;

// hadifayazi4@gmail.com
