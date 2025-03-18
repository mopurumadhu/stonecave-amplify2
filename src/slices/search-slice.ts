import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { RawFilter } from "../model/backend_model";

export interface SearchState {
  filters: RawFilter[];
  refreshToggle: boolean;
}

const initialState: SearchState = {
  filters: [],
  refreshToggle: false, // whenever this changes, refresh the results
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchGeo: (
      state,
      action: PayloadAction<{ lat: number; long: number; withIn: number }>
      // action: PayloadAction<SearchState>
    ) => {
      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;

      const newFilters: RawFilter[] = [];

      for (var fil of state.filters) {
        if (
          fil.name !== "lat" &&
          fil.name !== "long" &&
          fil.name !== "distance"
        ) {
          newFilters.push(fil);
        }
      }
      const tFilter: RawFilter = new RawFilter();
      tFilter.name = "lat";
      tFilter.value = action.payload.lat.toString();
      newFilters.push(tFilter);
      state.filters = newFilters;

      let latExists: boolean = false;
      for (var fil of state.filters) {
        if (fil.name == "lat") {
          latExists = true;
          fil.value = action.payload.lat.toString();
          break;
        }
      }
      if (!latExists) {
        const tFil: RawFilter = new RawFilter();
        tFil.name = "lat";
        tFil.value = action.payload.lat.toString();
        state.filters.push(tFil);
      }

      let longExists: boolean = false;
      for (var fil of state.filters) {
        if (fil.name == "long") {
          longExists = true;
          fil.value = action.payload.long.toString();
          break;
        }
      }
      if (!longExists) {
        const tFil: RawFilter = new RawFilter();
        tFil.name = "long";
        tFil.value = action.payload.long.toString();
        state.filters.push(tFil);
      }

      let withExists: boolean = false;
      for (var fil of state.filters) {
        if (fil.name == "distance") {
          withExists = true;
          fil.value = action.payload.withIn.toString();
          break;
        }
      }
      if (!withExists) {
        const tFil: RawFilter = new RawFilter();
        tFil.name = "distance";
        tFil.value = action.payload.withIn.toString();
        state.filters.push(tFil);
      }
    },

    updateSearchFilters: (
      state,
      action: PayloadAction<{ filters: RawFilter[] }>
      // action: PayloadAction<SearchState>
    ) => {
      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;
      state.filters = action.payload.filters;
    },

    addSearchFilter: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
        mutualExcl: boolean;
      }>
    ) => {
      // let reviewExists: boolean = false;
      // for (let i = 0; i < state.filters.length; i++) {
      //   if (state.filters[i].name == action.payload.name) {
      //     reviewExists = true;
      //     state.filters[i].value = action.payload.value;
      //     break;
      //   }
      // }
      // if (!reviewExists) {
      const newFilters: RawFilter[] = [];

      for (var fil of state.filters) {
        if (fil.name !== action.payload.name) {
          newFilters.push(fil);
        }
      }
      const tFilter: RawFilter = new RawFilter();
      tFilter.name = action.payload.name;
      tFilter.value = action.payload.value;
      newFilters.push(tFilter);
      state.filters = newFilters;

      // toggle the refresh indicator to refresh the search results
      state.refreshToggle = !state.refreshToggle;

      // }
    },

    removeSearchFilter: (
      state,
      action: PayloadAction<{ filter: RawFilter }>
    ) => {
      const newFilters: RawFilter[] = [];

      for (var fil of state.filters) {
        if (fil.name !== action.payload.filter.name) {
          newFilters.push(fil);
        }
      }
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
  updateSearchGeo,
  updateSearchFilters,
  addSearchFilter,
  removeSearchFilter,
} = searchSlice.actions;
// export const selectSearch = (state: RootState) => state.posts;
export default searchSlice.reducer;
