const TOKEN_PREFIX = "Bearer ";
const KEY = "jwt_token";

export const saveToken = (token) => {
  localStorage.setItem(KEY, token);
}

export const getToken = () => {
  const token = localStorage.getItem(KEY);
  if (token === null) {
    throw new Error("Token is null");
  }
  return TOKEN_PREFIX + localStorage.getItem(KEY);
}