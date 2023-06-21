import axios from "axios";
/**
 * Connects to API. Based on code from Code Institute 'Moments' walkthrough.
 */
axios.defaults.baseURL = 'https://barbelles-api.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();