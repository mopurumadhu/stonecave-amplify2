import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { RawFilter } from "../model/backend_model";

export interface RatingSearchState {
  filters: RawFilter[];
  refreshToggle: boolean;
}

const initialState: RatingSearchState = {
  filters: [],
  refreshToggle: false, // whenever this changes, refresh the results
};

export const ratingSearchSlice = createSlice({
  name: "ratingSearch",
  initialState,
  reducers: {
    updateRatingSearchFilters: (
      state,
      action: PayloadAction<{ filters: RawFilter[] }>
    ) => {
      state.refreshToggle = !state.refreshToggle;
      state.filters = action.payload.filters;
    },

    addRatingSearchFilter: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
        mutualExcl: boolean;
      }>
    ) => {
      const newFilters: RawFilter[] = [];

      for (var fil of state.filters) {
        if (fil.name !== action.payload.name) {
          newFilters.push(fil);
        }
      }

      if (parseInt(action.payload.value) > 0) {
        const tFilter: RawFilter = new RawFilter();
        tFilter.name = action.payload.name;
        tFilter.value = action.payload.value;
        newFilters.push(tFilter);
      }
      state.filters = newFilters;

      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;

      // }
    },

    removeRatingSearchFilter: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const newFilters: RawFilter[] = [];

      for (var fil of state.filters) {
        if (fil.name !== action.payload.name) {
          newFilters.push(fil);
        }
      }
      state.filters = newFilters;

      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;
    },

    clearRatingSearchFilters: (state) => {
      const newFilters: RawFilter[] = [];

      state.filters = newFilters;

      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;
    },
    // when no changes are in Filters but need to refetch the search results - not sure when to use but have added
    toggleRefresh: (state) => {
      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;
    },
  },
});

export const {
  updateRatingSearchFilters,
  addRatingSearchFilter,
  removeRatingSearchFilter,
  clearRatingSearchFilters,
} = ratingSearchSlice.actions;
// export const selectSearch = (state: RootState) => state.posts;
export default ratingSearchSlice.reducer;
