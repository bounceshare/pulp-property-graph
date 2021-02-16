import axios from "./axiosInstance";

const setupInterceptor = token => {
    console.log("****token****", token);
    // Add a request interceptor
    axios.interceptors.request.use(
        config => {
            // Do something before request is sent
            if (token) {
                config.headers["x-app-auth-token"] = `${token}`;
            }
            return config;
        },
        error => {
            // Do something with request error
            console.warn("Request Error-->", JSON.stringify(error));
            //return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        response => {
            // Do something with response data
            console.warn("Response Success-->", response);
            return response;
        },
        error => {
            // Do something with response error
            console.warn("Response Error-->", JSON.stringify(error));
            return Promise.reject(error);
        }
    );
};

export default setupInterceptor;
