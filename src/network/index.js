import axiosInstance from "./axios/axiosInstance";
import setupInterceptor from "./axios/interceptor";

const post = (url, body) => {
    console.warn("body->", body);

    return axiosInstance.post(url, body).catch(error => handleError(error));
};
const get = url => {
    return axiosInstance
        .get(url, defaultApiConfig)
        .catch(error => handleError(error));
};

export const Network = {
    setupInterceptor,
    post,
    get
};
/************************ Api Config utils ****************************/
const defaultApiConfig = {
    headers: {
        "Content-Type": "application/json"
    }
};
const handleError = error => {
    console.warn("***error***", error);
};
