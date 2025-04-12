import Http from "./Http";
// trang chủ quản trị
export const getAdmin = (config) => {
  return Http.get("/admin/dashboard", config);
};
// danh sách danh mục
export const getCategories = (config) => {
  return Http.get("/categories", config);
};
// chi tiết danh mục
export const getCategoryById = (id) => {
  return Http.get(`/categories/${id}`); // Gửi yêu cầu GET tới API để lấy danh mục theo ID
  // thêm danh mục
};
export const getCategoriesAdd = (config) => {
  return Http.post("/categories/create", config);
  // sửa danh mục
};
export const getCategoriesUpdt = (id, data) => {
  return Http.post(`/categories/${id}/update`, data);
};
// xóa danh mục
export const getCategoriesDelete = (id, data) => {
  return Http.delete(`/categories/${id}/delete`, data);
};
// danh sách users
export const getUsers = (config) => {
  return Http.get("/users", config);
};
// danh sách users
export const getUsersAdd = (config) => {
  return Http.post("/users/create", config);
};
export const getUsersUpdt = (id, data) => {
  return Http.patch(`/users/${id}/update`, data);
};
export const getUsersById = (id) => {
  return Http.get(`/users/${id}`);
};
export const getUsersDelete = (id, data) => {
  return Http.delete(`/users/${id}/delete`);
};

export const getProducts = ({ params }) => {
  return Http.get(`/products`, { params });
};
export const getProductsById = (id) => {
  return Http.get(`/products/${id}`);
};
// danh sách users
export const getProductsAdd = (config) => {
  return Http.post("/products/create", config);
};
export const getProductsUpdt = (id, formData) => {
  return Http.patch(`/products/${id}/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getProductsDelete = (id, data) => {
  return Http.delete(`/products/${id}/delete`, data);
};
export const logoutAdmin = (data) => {
  return Http.post(`/admin/logout`, data, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
};
export const loginAdmin = (data) => {
  return Http.post(`/admin/login`, data);
};
export const getRefreshToken = (data) => {
  return Http.post(`/auths/refreshtoken`, data);
};
