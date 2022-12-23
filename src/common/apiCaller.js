import { API_URL } from "../config/api";
import { warningToast } from "./toast";

const LOG_TAG = "[Api caller utils]"

export const AUTH_PREFIX = "Bearer ";

export const getApi = async (path) => {
  const url = API_URL + path;
  console.log(LOG_TAG + " Start get API at " + url);
  const response = await fetch(url);
  const myJson = await response.json();
  return myJson;
}

export const postApi = async (path, requestBody = {}) => {
  const url = API_URL + path;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(requestBody)
  };
  console.log("Request options: ", requestOptions);

  const response = await fetch(url, requestOptions);
  // if (!response.ok) {
  //   warningToast("Có lỗi xảy ra. Vui lòng thử lại sau");
  // }
  // try {
  //   const myJson = await response.json();
  //   return myJson;
  // } catch {
  //   return "";
  // }

  return response;
}