import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

export interface ToggleState {
  displaySearchBar: boolean;
  displayFilters: boolean;
}

const initialState: ToggleState = {
  displaySearchBar: true,
  displayFilters: true,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    hideSearchBar: (state) => {
      state.displaySearchBar = false;
    },

    hideFilters: (state) => {
      state.displayFilters = false;
    },

    hideAll: (state) => {
      state.displaySearchBar = false;
      state.displayFilters = false;
    },

    showSearchBar: (state) => {
      state.displaySearchBar = true;
    },

    showFilters: (state) => {
      state.displayFilters = true;
    },

    showAll: (state) => {
      state.displaySearchBar = true;
      state.displayFilters = true;
    },
  },
});

export const {
  hideSearchBar,
  hideFilters,
  hideAll,
  showSearchBar,
  showFilters,
  showAll,
} = toggleSlice.actions;
// export const selectSearch = (state: RootState) => state.posts;
export default toggleSlice.reducer;
