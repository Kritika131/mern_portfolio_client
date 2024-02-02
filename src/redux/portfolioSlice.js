import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  loading:false,
  portfolioData:null,
  reloadData:false
}

const portfolioSlice = createSlice({
  name:"portfolio",
  initialState,

  reducers:{
    Showloading:(state,action)=>{
      state.loading=true;
    },
    Hideloading:(state,action)=>{
      state.loading=false;
    },
    SetPortfolioData:(state,action)=>{
      state.portfolioData=action.payload;
    },
    reloadingData:(state,action)=>{
      state.reloadData=action.payload
    }
  }

});

export const {Showloading,Hideloading,SetPortfolioData,reloadingData} = portfolioSlice.actions;

export default portfolioSlice.reducer;
