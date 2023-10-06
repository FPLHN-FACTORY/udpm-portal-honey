import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const AuctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    SetAuction: (state, action) => {
      state = action.payload;
      return state;
    },

    AddAuction: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateAuction: (state, action) => {
      const updateAuction = action.payload;
      const index = state.findIndex(
        (auction) => auction.id === updateAuction.id
      );
      if (index !== -1) {
        state[index].name = updateAuction.name;
        state[index].fromDate = updateAuction.fromDate;
        state[index].toDate = updateAuction.toDate;
        state[index].startingPrice = updateAuction.startingPrice;
        state[index].honey = updateAuction.honey;
        state[index].status = updateAuction.status;
        state[index].jump = updateAuction.jump;
        state[index].categoryId = updateAuction.categoryId;
        state[index].categoryName = updateAuction.categoryName;
      }
    },
    DeleteAuction: (state, action) => {
      const idAuction = action.payload;
      const index = state.findIndex((auction) => auction.id === idAuction);
      state.splice(index, 1);
    },
  },
});

export const GetAuction = (state) => state.auction;
export const { SetAuction, AddAuction, DeleteAuction, UpdateAuction } =
  AuctionSlice.actions;
export default AuctionSlice.reducer;
