import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'https://api.spacexdata.com/v3'
})

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    // Only run interceptor when certain condition is met
    if (/* condition */ true) {
      // Do something before request is sent
      console.log("Request is intercepted!");
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default AxiosInstance
