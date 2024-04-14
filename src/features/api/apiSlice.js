// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constans';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Venue', 'Venues'],
  endpoints: (builder) => ({
    getVenue: builder.query({
      query: (id) => `/venues/${id}`,
      providesTags: ['Venue'],
    }),
    getVenues: builder.query({
      query: () => '/venues',
      providesTags: ['Venues'],
    }),
  }),
});

export const { useGetVenueQuery, useGetVenuesQuery } = apiSlice;
