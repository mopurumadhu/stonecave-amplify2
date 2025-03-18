import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import {
  MasterAmenity,
  MasterStayPlan,
  PropAmenity,
  RawFilter,
} from "../model/backend_model";

export interface MasterState {
  amenities: MasterAmenity[];
  stayPlans: MasterStayPlan[];
  screenSize: string;
  screenWidth: number;
  isMobile: boolean;
}

const initialState: MasterState = {
  amenities: [],
  stayPlans: [],
  screenSize: "xs", // default assume screen is Mobile
  isMobile: true, // components listens to this variable, this variable change is lesser than actual screen size
  screenWidth: window.innerWidth,
};

export const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    fetchAmenities: (
      state,
      action: PayloadAction<{ amenities: MasterAmenity[] }>
    ) => {
      state.amenities = action.payload.amenities;
    },

    addAmenities: (
      state,
      action: PayloadAction<{ amenities: MasterAmenity[] }>
    ) => {
      state.amenities = action.payload.amenities;
    },

    addStayPlans: (
      state,
      action: PayloadAction<{ stayPlans: MasterStayPlan[] }>
    ) => {
      state.stayPlans = action.payload.stayPlans;
    },

    addScreenSize: (state, action: PayloadAction<{ width: number }>) => {
      const twidth: number = action.payload.width;
      let tScreenSize: string = "xs";
      if (twidth < 640) {
        tScreenSize = "xs";
      } else if (twidth >= 640 && twidth < 768) {
        tScreenSize = "sm";
      } else if (twidth >= 768 && twidth < 1024) {
        tScreenSize = "md";
      } else if (twidth >= 1024 && twidth < 1280) {
        tScreenSize = "lg";
      } else if (twidth >= 1280 && twidth < 1536) {
        tScreenSize = "xl";
      } else if (twidth >= 1536) {
        tScreenSize = "2xl";
      }

      state.screenSize = tScreenSize;
      if (tScreenSize == "xs") {
        state.isMobile = true;
      } else {
        state.isMobile = false;
      }
    },
  },
});

export const { fetchAmenities, addAmenities, addStayPlans, addScreenSize } =
  masterSlice.actions;
// export const selectSearch = (state: RootState) => state.posts;
export default masterSlice.reducer;
