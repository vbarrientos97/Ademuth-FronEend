import axios from "axios";

export const getProductRequest = async (products) => {
  await axios.get("http://localhost:3000/api/v1/products");
};
