import axios from 'axios';

const URL = 'http://localhost:5270/api'; // Replace with your actual base URL

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token in the headers for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh and 401 unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refToken = localStorage.getItem('refresh'); // Retrieve the refresh token
      let response;

      if (refToken) {
        try {
          response = await axios.post(`${URL}/SuperUserLogin/refresh`, { refreshToken: refToken });

          if (response.status === 200) {
            const newAccessToken = response.data.access;
            const newRefresh = response.data.refresh;

            // Store the new tokens in localStorage
            localStorage.setItem('access', newAccessToken);
            localStorage.setItem('refresh', newRefresh);

            // Retry the failed request with the new access token
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance.request(error.config);
          }
        } catch (refreshError) {
          // Handle token refresh failure (e.g., redirect to login)
          console.error('Token refresh failed:', refreshError);
          // Optionally: redirect to login or clear local storage
        }
      } else {
        // Optionally handle case where refresh token is not available
        console.error('No refresh token available.');
      }
    }

    // Reject the promise if token refresh fails or if it's a different error
    return Promise.reject(error);
  }
);

export default axiosInstance;
