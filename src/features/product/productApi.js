import { axiosInstance } from "../../lib/axios.js";

export const productApi = {
  addNewProduct: (data) => axiosInstance.post("/product/create", data),

  getAllProducts: () => axiosInstance.get("/product"),

  reaction: (id, data) => axiosInstance.patch(`/product/${id}/reaction`, data),

  addBid: (id, data) => axiosInstance.post(`/product/${id}/bid`, data),

  getBids: (id) => axiosInstance.get(`/product/${id}/bids`),
};
