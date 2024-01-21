import { configureStore } from "@reduxjs/toolkit";
import weekDatesReducer from "./weekDatesSlice";
import weekEventsReducer from "./weekEventsSlice";
import modalReducer from "./modalSlice"
import { appApi } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    weekDates: weekDatesReducer,
    weekEvents: weekEventsReducer,
    modal: modalReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
