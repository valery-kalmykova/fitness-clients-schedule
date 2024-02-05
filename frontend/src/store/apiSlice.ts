import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Event", "Clients", "Task"],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ startDate, endDate }) => `event/${startDate}/${endDate}`,
      providesTags: ["Event"],
    }),
    getAllTasks: builder.query({
      query: ({ startDate, endDate }) => `task/${startDate}/${endDate}`,
      providesTags: ["Task"],
    }),
    getEvent: builder.query({
      query: (id) => `event/${id}`,
      providesTags: ["Event"],
    }),
    getTask: builder.query({
      query: (id) => `task/${id}`,
      providesTags: ["Task"],
    }),
    createEvent: builder.mutation({
      query: (payload) => {
        const { repeat, ...formdata } = payload;
        return {
          url: `event?repeat=${repeat}`,
          method: "POST",
          body: formdata.formData,
        };
      },
      invalidatesTags: ["Event"],
    }),
    createTask: builder.mutation({
      query: (formdata) => ({
        url: `task`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    deleteAllRelated: builder.mutation({
      query: (relatedId) => ({
        url: `event/all-related/${relatedId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    deleteAllFutureRelated: builder.mutation({
      query: (payload) => {
        const { id, relatedId } = payload;
        return {
          url: `event/all-future-related/${id}/${relatedId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Event"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateEvent: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `event/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Event"],
    }),
    updateTask: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `task/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Task"],
    }),
    getAllClients: builder.query({
      query: () => `clients`,
      providesTags: ["Clients"],
    }),
    getClient: builder.query({
      query: (id) => `clients/${id}`,
      providesTags: ["Event"],
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
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `clients/${id}`,
          method: "PATCH",
          body: body,
        };
      },
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
  useGetAllTasksQuery,
  useGetEventQuery,
  useGetTaskQuery,
  useCreateEventMutation,
  useCreateTaskMutation,
  useUpdateEventMutation,
  useUpdateTaskMutation,
  useDeleteEventMutation,
  useDeleteAllRelatedMutation,
  useDeleteAllFutureRelatedMutation,
  useDeleteTaskMutation,
  useLazyGetAllEventsQuery,
  useLazyGetAllTasksQuery,
  useGetAllClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = appApi;
