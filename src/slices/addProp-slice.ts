import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { stat } from "fs";
import {
  Address,
  Contact,
  NearBy,
  PHUploadFile,
  PropAmenity,
  PropStayPlan,
} from "../model/backend_model";

interface Option {
  value: string;
  label: string;
}
export interface AddPropState {
  propId: string;
  type: string;
  title: string;
  description: string;
  status: string;
  floors: number;
  yearBuilt: number;
  renovated: boolean;
  yearRenovated: number;
  effective: Date;
  address: Address;
  contact: Contact;
  amenities: PropAmenity[];
  stayPlans: PropStayPlan[];
  firstName: string;
  lastName: string;
  mobile: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  landMark: string;

  busName: string;
  busLine1: string;
  busLine2: string;
  busCity: string;
  busState: string;
  busZip: string;
  busDistance: string;

  trainName: string;
  trainLine1: string;
  trainLine2: string;
  trainCity: string;
  trainState: string;
  trainZip: string;
  trainDistance: string;

  airName: string;
  airLine1: string;
  airLine2: string;
  airCity: string;
  airState: string;
  airZip: string;
  airDistance: string;

  email: string;
  password: string;
  apiName: string;
  apiStatus: string;
  apiError: string;
  files: FileList | null;
  deletePropertyImageIndex: number;
  propFiles: PHUploadFile[];
  propFileDescrUpdateIndex: number;
  propFileDescrUpdate: string;
  busAddress: Address;
  trainAddress: Address;
  airAddress: Address;

  masterAmens: Option[];
  masterAmenUsageTypes: Option[];
}

const initialState: AddPropState = {
  firstName: "",
  lastName: "",
  mobile: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  landMark: "",

  busName: "",
  busLine1: "",
  busLine2: "",
  busCity: "",
  busState: "",
  busZip: "",
  busDistance: "0",

  trainName: "",
  trainLine1: "",
  trainLine2: "",
  trainCity: "",
  trainState: "",
  trainZip: "",
  trainDistance: "0",

  airName: "",
  airLine1: "",
  airLine2: "",
  airCity: "",
  airState: "",
  airZip: "",
  airDistance: "0",

  email: "",
  password: "",
  propId: "",
  type: "",
  title: "",
  description: "",
  status: "",
  floors: 0,
  yearBuilt: 2024,
  renovated: false,
  yearRenovated: 2024,
  effective: new Date(),
  apiName: "",
  apiStatus: "",
  apiError: "",
  files: null,
  deletePropertyImageIndex: -1,
  propFiles: [],
  propFileDescrUpdateIndex: -1,
  propFileDescrUpdate: "",
  address: new Address(),
  busAddress: new Address(),
  trainAddress: new Address(),
  airAddress: new Address(),
  contact: new Contact(),
  amenities: [],
  stayPlans: [],

  masterAmens: [],
  masterAmenUsageTypes: [],
};

export interface PropBasic {
  type: string;
  title: string;
  description: string;
  status: string;
  floors: number;
  yearBuilt: number;
  renovated: boolean;
  yearRenovated: number;
  effective: Date;
  address: Address;
}

export const addPropSlice = createSlice({
  name: "addProp",
  initialState,
  reducers: {
    setAddPropTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    setAddPropDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },

    setAddPropYearBuilt: (state, action: PayloadAction<number>) => {
      state.yearBuilt = action.payload;
    },

    setAddPropRenovated: (state, action: PayloadAction<boolean>) => {
      state.renovated = action.payload;
    },

    setAddPropYearRenovated: (state, action: PayloadAction<number>) => {
      state.yearRenovated = action.payload;
    },

    setAddPropLine1: (state, action: PayloadAction<string>) => {
      state.address.line1 = action.payload;
      state.line1 = action.payload;
    },

    setAddPropLine2: (state, action: PayloadAction<string>) => {
      state.line2 = action.payload;
    },
    setAddPropCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },

    setAddPropState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },

    setAddPropZip: (state, action: PayloadAction<string>) => {
      state.zip = action.payload;
    },

    setAddPropLandMark: (state, action: PayloadAction<string>) => {
      state.landMark = action.payload;
    },

    setPropBasic: (state, action: PayloadAction<PropBasic>) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.yearBuilt = action.payload.yearBuilt;
      state.renovated = action.payload.renovated;
      state.yearRenovated = action.payload.yearRenovated;
      state.address = action.payload.address;
    },

    setContact: (state, action: PayloadAction<Contact>) => {
      state.contact = action.payload;
    },
    setPropAmenities: (state, action: PayloadAction<PropAmenity[]>) => {
      state.amenities = action.payload;
    },
    setPropStayPlans: (state, action: PayloadAction<PropStayPlan[]>) => {
      state.stayPlans = action.payload;
    },
    setBusAddress: (
      state,
      action: PayloadAction<{
        name: string;
        address: Address;
        distance: string;
      }>
    ) => {
      state.busName = action.payload.name;
      state.busAddress = action.payload.address;
      state.busDistance = action.payload.distance;
    },
    setTrainAddress: (
      state,
      action: PayloadAction<{
        name: string;
        address: Address;
        distance: string;
      }>
    ) => {
      state.trainName = action.payload.name;
      state.trainAddress = action.payload.address;
      state.trainDistance = action.payload.distance;
    },
    setAirAddress: (
      state,
      action: PayloadAction<{
        name: string;
        address: Address;
        distance: string;
      }>
    ) => {
      state.airName = action.payload.name;
      state.airAddress = action.payload.address;
      state.airDistance = action.payload.distance;
    },
    setAddPropImages: (state, action: PayloadAction<PHUploadFile[]>) => {
      state.propFiles = action.payload;
    },

    clearProp: (state) => {
      return initialState;
    },

    loadAddPropMasterData: (state) => {
      state.propFiles = [];
    },
  },
});

export const {
  setAddPropTitle,
  setAddPropDescription,
  setAddPropYearBuilt,
  setAddPropRenovated,
  setAddPropYearRenovated,
  setAddPropLine1,
  setAddPropLine2,
  setAddPropCity,
  setAddPropState,
  setAddPropZip,
  setAddPropLandMark,
  setPropBasic,
  setContact,
  setPropAmenities,
  setPropStayPlans,
  setBusAddress,
  setTrainAddress,
  setAirAddress,
  setAddPropImages,
  clearProp,
} = addPropSlice.actions;
// export const selectSearch = (state: RootState) => state.posts;
export default addPropSlice.reducer;
