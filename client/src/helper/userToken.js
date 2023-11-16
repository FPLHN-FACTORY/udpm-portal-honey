/** @format */

import { jwtDecode } from "jwt-decode";
import { eraseCookie, getCookie, setCookie } from "./cookie";

export const getToken = () => {
  return localStorage.getItem("userToken") || getCookie("userToken") || "";
};

export const setToken = (token, remember) => {
  remember ? localStorage.setItem("userToken", token) : setCookie("userToken", token, 1);
};

export const deleteToken = () => {
  localStorage.removeItem("userToken");
  eraseCookie("userToken");
};

export const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    // Kiểm tra nếu token không hết hạn
    if (decodedToken.exp > Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (error) {
    return false; // Nếu có lỗi khi giải mã, nghĩa là token không hợp lệ
  }
};

export const getRolesUse = () => {
  return getCookie("rolesUse") !== undefined
    ? getCookie("rolesUse")
    : null;

}
export const setRolesUse = (roles) => {
  setCookie("rolesUse", roles, 1);
}
export const deleteRolesUse = () => {
  setCookie("rolesUse", "", 1);
}

export const userToken = () => {
  return getCookie("accountUser") !== undefined
    ? getCookie("accountUser")
    : null;
};

export const setAccountUser = (user) => {
  setCookie("accountUser", user, 1);
};

export const deleteAccountUser = () => {
  setCookie("accountUser", "", 1);
};

