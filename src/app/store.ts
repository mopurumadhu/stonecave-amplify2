import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/search-slice";
import ratingSearchReducer from "../slices/rating-search-slice";
import userReducer from "../slices/user-slice";
import masterReducer from "../slices/master-slice";
import addPropReducer from "../slices/addProp-slice";
import toggleReducer from "../slices/toggle-slice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    ratingSearch: ratingSearchReducer,
    user: userReducer,
    master: masterReducer,
    addProp: addPropReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV !== "production",
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
