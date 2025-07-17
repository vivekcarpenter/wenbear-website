// src/services/blogApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../api/api";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/posts",
      providesTags: ["Blogs"],
    }),
    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/post",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `/post/${id}`,
        method: "PATCH",
        body,
        formData: true,
      }),
      invalidatesTags: ["Blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
