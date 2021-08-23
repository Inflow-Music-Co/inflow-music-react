import axios from "axios";
import localStorageService from "./localstorage";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      //   config.headers["Authorization"] = "Bearer " + token;
      config.headers["x-access-token"] = token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== `${process.env.REACT_APP_SERVER_URL}/v1/user/login` && err.response && err.response !== 403) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/refreshtoken`, {
            refreshToken: localStorageService.getRefreshToken()
          });

          const { accessToken } = res.data;
          localStorageService.setToken(accessToken);
          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

//Add a response interceptor

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       originalRequest.url ===
//       `${process.env.REACT_APP_SERVER_URL}/v1/user/login`
//     ) {
//       // router.push("/login");
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorageService.getRefreshToken();
//       return axios
//         .post(`${process.env.REACT_APP_SERVER_URL}/v1/user/refreshtoken`, { refreshToken })
//         .then((res) => {
//           if (res.status === 201) {
//             localStorageService.setToken(res.data);
//             axios.defaults.headers.common["x-access-token"] = localStorageService.getAccessToken();
//             return axios(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );

