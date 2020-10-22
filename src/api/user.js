import axios from "axios";
import { baseUrl } from "../utils";

export const login = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/json";
  const config = {
    url: "/user/login",
    method: "post",
    data: {
      username: params.username,
      pwd: params.pwd
    }
  };

  return await axios(config);
};
