import { request } from "../../../helper/request.helper";

export class TransactionApi {
  static COMPONENT_NAME = "student/transaction";

  static getCategory = (recipientId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/category`,
      params: { recipientId },
    });
  };
  static searchStudent = (username) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/search-student`,
      params: { username },
    });
  };
  static getStudent = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-student`,
      params: { id },
    });
  };
  static getHoney = (categoryId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-honey`,
      params: { categoryId },
    });
  };
  static verify = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/verify`,
    });
  };
  static checkVerify = (code) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/check-verify`,
      params: { code },
    });
  };
  static transaction = (transactionRequest) => {
    return request({
      method: "Post",
      url: `/${this.COMPONENT_NAME}`,
      params: transactionRequest,
    });
  };
  static getHistory = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-history`,
      params: filter,
    });
  };
  static changeStatus = (idHistory, status) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/change-status`,
      data: { idHistory, status },
    });
  };
  static getUserLogin = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-user-login`,
    });
  };
}
