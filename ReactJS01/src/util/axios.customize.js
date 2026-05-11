import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// ==========================================
// 1. GỬI ĐI: Tự động gắn Token vào Header
// ==========================================
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// ==========================================
// 2. NHẬN VỀ: Rút gọn dữ liệu trả về
// ==========================================
instance.interceptors.response.use(
  function (response) {
    // Nếu có dữ liệu thì trả về luôn dữ liệu đó (thường là res.data)
    if (response && response.data) return response.data;
    return response;
  },
  function (error) {
    // Nếu server trả về lỗi (như 401 Unauthorized), ta trả về data lỗi để xử lý ở từng trang
    if (error?.response?.data) return error.response.data;
    return Promise.reject(error);
  },
);

export default instance;
