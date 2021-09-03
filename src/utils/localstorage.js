/* eslint-disable */

function setToken(tokenObj) {
  localStorage.setItem("access_token", tokenObj.access_token);
}
function getAccessToken() {
  return localStorage.getItem("access_token");
}
function getDidToken() {
  return localStorage.getItem("didToken");
}

function clearToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("didToken");
  localStorage.removeItem("account_type");
  localStorage.removeItem("id");
}

export default {
  setToken,
  getAccessToken,
  getDidToken,
  clearToken,
};
