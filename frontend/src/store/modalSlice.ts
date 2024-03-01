import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RELATED_TYPE } from "../utils/types";

export interface modalEventState {
  isOpenAddEvent: boolean;
  isOpenEventInfo: boolean;
  isOpenTaskInfo: boolean;
  isOpenAddClient: boolean;
  isOpenEditClient: boolean;
  selectedDate: string | null;
  eventId: string | null;
  editMode: boolean;
  relatedId: { id: string; type: RELATED_TYPE } | null;
}

const initialState: modalEventState = {
  isOpenAddEvent: false,
  isOpenEventInfo: false,
  isOpenTaskInfo: false,
  isOpenAddClient: false,
  isOpenEditClient: false,
  selectedDate: null,
  eventId: null,
  editMode: false,
  relatedId: null,
};

export const modalEventSlice = createSlice({
  name: "modalEvent",
  initialState,
  reducers: {
    setModalAddEventIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddEvent = action.payload;
    },
    setModalEventInfoIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenEventInfo = action.payload;
    },
    setModalTaskInfoIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenTaskInfo = action.payload;
    },
    setEventId: (state, action: PayloadAction<string | null>) => {
      state.eventId = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setModalAddClientIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddClient = action.payload;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    setModalEditClientIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditClient = action.payload;
    },
    setRelatedId: (
      state,
      action: PayloadAction<{ id: string; type: RELATED_TYPE } | null>
    ) => {
      state.relatedId = action.payload;
    },
  },
});

export const {
  setModalAddEventIsOpen,
  setModalEventInfoIsOpen,
  setModalTaskInfoIsOpen,
  setEventId,
  setSelectedDate,
  setModalAddClientIsOpen,
  setEditMode,
  setModalEditClientIsOpen,
  setRelatedId,
} = modalEventSlice.actions;

export default modalEventSlice.reducer;
