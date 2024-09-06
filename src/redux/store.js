import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../redux/countrySlice";

export const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});
