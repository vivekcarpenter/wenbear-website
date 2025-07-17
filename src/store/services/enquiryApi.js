// src/services/inquiryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../../api/api';

export const enquiryApi = createApi({
  reducerPath: 'enquiryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['enquiries'],
  endpoints: (builder) => ({
    getAllEnquiries: builder.query({
      query: () => '/enquiries',
      providesTags: ['enquiries'],
    }),
    markEnquiryAsRead: builder.mutation({
      query: (id) => ({
        url: `/enquiry/${id}/markAsRead`,
        method: 'PATCH',
      }),
      invalidatesTags: ['enquiries'],
    }),
    replyToEnquiry: builder.mutation({
      query: ({ id, message }) => ({
        url: `/enquiry/${id}/reply`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['enquiries'],
    }),
    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/enquiry/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['enquiries'],
    }),
    addEnquiry: builder.mutation({
      query: (newInquiry) => ({
        url: '/enquiry',
        method: 'POST',
        body: newInquiry,
      }),
      invalidatesTags: ['enquiries'],
    }),
    deleteAllEnquiries: builder.mutation({
      query: () => ({
        url: '/enquiries/deleteMany',
        method: 'DELETE',
      }),
      invalidatesTags: ['enquiries'],
    }),
  }),
});

export const {
  useGetAllEnquiriesQuery,
  useMarkEnquiryAsReadMutation,
  useReplyToEnquiryMutation,
  useDeleteEnquiryMutation,
  useAddEnquiryMutation,
  useDeleteAllEnquiriesMutation,
} = enquiryApi;
