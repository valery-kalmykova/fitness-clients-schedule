import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Event", "Clients"],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({startDate, endDate}) => `event/${startDate}/${endDate}`,
      providesTags: ["Event"],
    }),
    getEvent: builder.query({
      query: (id) => `event/${id}`,
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `event`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation({
      query: ({data, id}) => ({
        url: `event/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    getAllClients: builder.query({
      query: () => `clients`,
      providesTags: ["Clients"],
    }),
    getClient: builder.query({
      query: (id) => `clients/${id}`,
    }),
    addClient: builder.mutation({
      query: (data) => ({
        url: `clients`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: ({data, id}) => ({
        url: `clients/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useLazyGetAllEventsQuery,
  useGetAllClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = appApi;
