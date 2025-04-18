import { createSlice } from "@reduxjs/toolkit";
import {
  addBid,
  addNew,
  getAllProducts,
  getBids,
  reaction,
} from "./productThunks.js";

const initialState = {
  allProducts: [],
  lastAddedProduct: null,
  loading: {
    addProduct: false,
    getAllProducts: false,
    addBid: false,
    getBids: false,
    reaction: false,
  },
  error: {
    addProduct: null,
    getAllProducts: null,
    addBid: null,
    getBids: null,
    reaction: null,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add new product
      .addCase(addNew.pending, (state) => {
        state.loading.addProduct = true;
        state.error.addProduct = null;
      })
      .addCase(addNew.fulfilled, (state, action) => {
        state.loading.addProduct = false;
        state.lastAddedProduct = action.payload;
        state.error.addProduct = null;
      })
      .addCase(addNew.rejected, (state, action) => {
        state.loading.addProduct = false;
        state.error.addProduct = action.payload;
      })

      // get all products
      .addCase(getAllProducts.pending, (state) => {
        state.loading.getAllProducts = true;
        state.error.getAllProducts = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading.getAllProducts = false;
        state.allProducts = action.payload;
        state.error.getAllProducts = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading.getAllProducts = false;
        state.error.getAllProducts = action.payload;
      })

      // add bid
      .addCase(addBid.pending, (state) => {
        state.loading.addBid = true;
        state.error.addBid = null;
      })
      .addCase(addBid.fulfilled, (state) => {
        state.loading.addBid = false;
        state.error.addBid = null;
      })
      .addCase(addBid.rejected, (state, action) => {
        state.loading.addBid = false;
        state.error.addBid = action.payload;
      })

      // get bids
      .addCase(getBids.pending, (state) => {
        state.loading.getBids = true;
        state.error.getBids = null;
      })
      .addCase(getBids.fulfilled, (state) => {
        state.loading.getBids = false;
        state.error.getBids = null;
      })
      .addCase(getBids.rejected, (state, action) => {
        state.loading.getBids = false;
        state.error.getBids = action.payload;
      })

      // reaction
      .addCase(reaction.pending, (state) => {
        state.loading.reaction = true;
        state.error.reaction = null;
      })
      .addCase(reaction.fulfilled, (state) => {
        state.loading.reaction = false;
        state.error.reaction = null;
      })
      .addCase(reaction.rejected, (state, action) => {
        state.loading.reaction = false;
        state.error.reaction = action.payload;
      });
  },
});

export default productSlice.reducer;
