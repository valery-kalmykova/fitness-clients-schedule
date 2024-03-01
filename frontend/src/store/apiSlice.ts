import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/constants";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: [
    "Events",
    "Clients",
    "Tasks",
    "Event",
    "Client",
    "Task",
    "Payments",
  ],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ startDate, endDate }) => `event/${startDate}/${endDate}`,
      providesTags: ["Events"],
    }),
    getAllTasks: builder.query({
      query: ({ startDate, endDate }) => `task/${startDate}/${endDate}`,
      providesTags: ["Tasks"],
    }),
    getEvent: builder.query({
      query: (id) => `event/${id}`,
      providesTags: ["Events", "Event"],
    }),
    getTask: builder.query({
      query: (id) => `task/${id}`,
      providesTags: ["Tasks", "Task"],
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
      invalidatesTags: ["Events", "Clients"],
    }),
    createTask: builder.mutation({
      query: (formdata) => ({
        url: `task`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events", "Clients"],
    }),
    deleteAllRelated: builder.mutation({
      query: (relatedId) => ({
        url: `event/all-related/${relatedId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events", "Clients"],
    }),
    deleteAllFutureRelated: builder.mutation({
      query: (payload) => {
        const { id, relatedId } = payload;
        return {
          url: `event/all-future-related/${id}/${relatedId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Events", "Clients"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateEvent: builder.mutation({
      query: (payload) => {
        const { id, ...formData } = payload;
        return {
          url: `event/${id}`,
          method: "PATCH",
          body: formData.formData,
        };
      },
      invalidatesTags: ["Event", "Events", "Clients"],
    }),
    updateAllRelated: builder.mutation({
      query: (payload) => {
        const { id, relatedId, ...formData } = payload;
        return {
          url: `event/all-related/${id}/${relatedId}`,
          method: "PATCH",
          body: formData.formData,
        };
      },
      invalidatesTags: ["Event", "Events", "Clients"],
    }),
    updateAllFutureRelated: builder.mutation({
      query: (payload) => {
        const { id, relatedId, ...formData } = payload;
        return {
          url: `event/all-future-related/${id}/${relatedId}`,
          method: "PATCH",
          body: formData.formData,
        };
      },
      invalidatesTags: ["Event", "Events", "Clients"],
    }),
    updateTask: builder.mutation({
      query: (payload) => {
        const { id, ...formData } = payload;
        return {
          url: `task/${id}`,
          method: "PATCH",
          body: formData.formData,
        };
      },
      invalidatesTags: ["Task", "Tasks"],
    }),
    getAllClients: builder.query({
      query: () => `clients`,
      providesTags: ["Clients"],
    }),
    getArchivedClients: builder.query({
      query: () => `clients/archive`,
      providesTags: ["Clients"],
    }),
    getClient: builder.query({
      query: (id) => `clients/${id}`,
      providesTags: ["Clients", "Client"],
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
        const { id, ...formData } = payload;
        return {
          url: `clients/${id}`,
          method: "PATCH",
          body: formData.formData,
        };
      },
      invalidatesTags: ["Client", "Clients"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
    getAllClientPayments: builder.query({
      query: (id) => `clients-payments/${id}`,
      providesTags: ["Payments"],
    }),
    addClientPayment: builder.mutation({
      query: (data) => ({
        url: `clients-payments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
    updateClientPayment: builder.mutation({
      query: (payload) => {
        const { id, ...formData } = payload;
        return {
          url: `clients-payments/${id}`,
          method: "PATCH",
          body: formData.formData,
        };
      },
      invalidatesTags: ["Payments"],
    }),
    deleteClientPaymentbyId: builder.mutation({
      query: (id) => ({
        url: `clients-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
    deleteClientPayment: builder.mutation({
      query: (data) => ({
        url: `clients-payments`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Payments"],
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
  useUpdateAllRelatedMutation,
  useUpdateAllFutureRelatedMutation,
  useUpdateTaskMutation,
  useDeleteEventMutation,
  useDeleteAllRelatedMutation,
  useDeleteAllFutureRelatedMutation,
  useDeleteTaskMutation,
  useLazyGetAllEventsQuery,
  useLazyGetAllTasksQuery,
  useGetAllClientsQuery,
  useGetArchivedClientsQuery,
  useLazyGetAllClientsQuery,
  useLazyGetArchivedClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetAllClientPaymentsQuery,
  useAddClientPaymentMutation,
  useUpdateClientPaymentMutation,
  useDeleteClientPaymentbyIdMutation,
  useDeleteClientPaymentMutation,
} = appApi;
