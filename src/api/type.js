import axios from "axios";
import { baseUrl } from "../utils";

export const add = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/json";
  const config = {
    url: "/type/create",
    method: "post",
    data: {
      name: params.name,
      default_safe_date: params.default_safe_date
    }
  };

  return await axios(config);
};

export const list = async () => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/json";
  const config = {
    url: "/type/list",
    method: "get"
  };

  return await axios(config);
};

export const remove = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/json";
  const config = {
    url: "/type/delete",
    method: "post",
    data: {
      _id: params._id
    }
  };

  return await axios(config);
};

export const update = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/json";
  const config = {
    url: "/type/update",
    method: "post",
    data: params
  };

  return await axios(config);
};