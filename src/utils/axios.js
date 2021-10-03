import axios from "axios";
import { Magic } from "magic-sdk";
import jwt_decode from "jwt-decode";

const customNodeOptions = {
  rpcUrl: "https://rpc-mainnet.maticvigil.com/", // Polygon RPC URL
  chainId: 137, // Polygon chain id
};

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
  network: customNodeOptions,
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
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
    if (
      originalConfig.url !==
        `${process.env.REACT_APP_SERVER_URL}/v1/user/login` &&
      err.response &&
      err.response !== 403
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { id, account_type } = jwt_decode(
            localStorage.getItem("access_token")
          );
          //if magic session is expired, it will fail. it is 7days as default
          const didToken = await magic.user.generateIdToken({
            lifespan: 60 * 60 * 25,
          });

          // get new access_token based on new didToken
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/v1/user/refreshtoken`,
            {
              didToken,
              account_type,
              id,
            }
          );

          localStorage.setItem("access_token", data.access_token);
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
