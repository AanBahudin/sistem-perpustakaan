import axios from "axios";

export const customFetch = axios.create({
  baseURL: "/api/v1",
});

// Tambahkan interceptor setelah instance dibuat
customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;

    if (statusCode === 401 || statusCode === 403) {
      window.location.href = "/";
    }

    // Harus return Promise.reject agar error bisa ditangani di .catch
    return Promise.reject(error);
  }
);
