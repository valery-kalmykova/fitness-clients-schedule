import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Event"],
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
      query: (data) => ({
        url: `event`,
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
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useLazyGetAllEventsQuery
} = appApi;

// const [getAllEvents] = useLazyGetAllEventsQuery()
