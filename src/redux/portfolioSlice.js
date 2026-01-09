import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  portfolioData: null,
  reloadData: false,
  viewingUsername: null, // Username of the portfolio being viewed
  analytics: null, // Analytics data for admin dashboard
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,

  reducers: {
    Showloading: (state) => {
      state.loading = true;
    },
    Hideloading: (state) => {
      state.loading = false;
    },
    SetPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    SetViewingUsername: (state, action) => {
      state.viewingUsername = action.payload;
    },
    reloadingData: (state, action) => {
      state.reloadData = action.payload;
    },
    ClearPortfolioData: (state) => {
      state.portfolioData = null;
      state.viewingUsername = null;
    },
    SetAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
  },
});

export const {
  Showloading,
  Hideloading,
  SetPortfolioData,
  SetViewingUsername,
  reloadingData,
  ClearPortfolioData,
  SetAnalytics,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
