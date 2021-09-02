/* eslint-disable */

function setToken(tokenObj) {
  localStorage.setItem("access_token", tokenObj.access_token);
  localStorage.setItem("refresh_token", tokenObj.refresh_token);
}
function getAccessToken() {
  return localStorage.getItem("access_token");
}
function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}
function getDidToken() {
  return localStorage.getItem("didToken");
}

function clearToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("didToken");
  localStorage.removeItem("email");
}

export default {
  setToken,
  getAccessToken,
  getRefreshToken,
  getDidToken,
  clearToken,
};
