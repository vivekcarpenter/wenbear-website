// store/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../api/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login", // must match your backend route
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: (_id) => `/profile/${_id}`,
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (_id,data) => ({
        url: `/profile/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgotPassword",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/resetPassword/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
