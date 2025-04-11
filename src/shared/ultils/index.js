import { BASE_URL } from "../constants/app";

export const getImageProduct = (image) => {
  const path = image.startsWith("products/") ? image : `products/${image}`;
  return `${BASE_URL}/asset/upload/images/${path}`;
};
