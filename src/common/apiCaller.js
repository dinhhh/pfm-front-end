import { getToken } from "./localStorage";
import { API_URL } from "../config/api";
import { warningToast } from "./toast";

const LOG_TAG = "[Api caller utils]";

export const AUTH_PREFIX = "Bearer ";

export const getApi = async (path) => {
  const url = API_URL + path;
  console.log(LOG_TAG + " Start get API at " + url);
  const response = await fetch(url);
  const myJson = await response.json();
  return myJson;
}

export const getApiAuth = async ( path ) => {
  const token = getToken();
  const url = API_URL + path;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': token,
    }
  };
  console.log("Request options: ", requestOptions);

  const response = await fetch(url, requestOptions);

  return response;
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

  return response;
}

export const postApiAuth = async (path, requestBody = {}) => {
  const token = getToken();
  const url = API_URL + path;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': token,
    },
    body: JSON.stringify(requestBody)
  };
  console.log("Request options: ", requestOptions);

  const response = await fetch(url, requestOptions);

  return response;
}