import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum VisibilityFilter {
  ShowAll = "SHOW_ALL",
  ShowPsychologist = "SHOW_PSYCHOLOGIST",
  ShowPsychotherapist = "SHOW_PSYCHOTHERAPIST",
  ShowPsychiatrist = "SHOW_PSYCHIATRIST",
  ShowFavourite = "SHOW_FAVOURITE",
  ShowDisfavourite = "SHOW_DISFAVOURITE",
}

const initialState = VisibilityFilter.ShowAll;

const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  initialState,
  reducers: {
    setVisibilityFilter(state, action: PayloadAction<VisibilityFilter>) {
      return action.payload;
    }
  }
});

export const { setVisibilityFilter } = visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer; 