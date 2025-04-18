import { productApi } from "./productApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNew = createAsyncThunk(
  "product/addNew",
  async (data, { rejectWithValue }) => {
    try {
      const response = await productApi.addNewProduct(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.errors) || error.message;
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getAllProducts();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.errors) || error.message;
    }
  }
);

export const reaction = createAsyncThunk(
  "product/reaction",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const response = await productApi.reaction(id, { type });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.errors) || error.message;
    }
  }
);

export const addBid = createAsyncThunk(
  "product/addBid",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productApi.addBid(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.errors) || error.message;
    }
  }
);

export const getBids = createAsyncThunk(
  "product/getBids",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getBids(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.errors) || error.message;
    }
  }
);
