import { request } from "../../../helper/request.helper";

export class RequestManagerAPI {
  static COMPONENT_NAME = "censor/request-manager";

  //UserAPi
  static getUserAPiByCode = (code) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api`,
      params: { username: code },
    });
  };

  static getHistoryConversion = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/history-request-conversion`,
      params: filter,
    });
  };

  static getHistoryRequestAddItem = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/history-request-add-item`,
      params: filter,
    });
  };

  static getHistoryBuyGifft = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/history-buy-gift`,
      params: filter,
    });
  };

  static getExchangeGifts = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/exchange-gifts`,
      params: filter,
    });
  };

  static getUserAPiById = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api/${id}`,
    });
  };

  static getCategory = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/category`,
    });
  };

  static getAddPoint = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/add-point`,
      params: filter,
    });
  };

  static historyApproved = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/approved-history`,
      params: filter,
    });
  };

  static listRequest = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-request`,
      params: filter,
    });
  };

  static getTransaction = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/transaction`,
      params: filter,
    });
  };
  static changeStatus = (idHistory, idHistoryDetail, status) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/change-status`,
      data: { idHistory, idHistoryDetail, status },
    });
  };

  static changeStatusConversion = (
    idStudent,
    idGift,
    idHistory,
    idHistoryDetail,
    status,
    quantityGift
  ) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/change-status-conversion`,
      data: {
        idStudent,
        idGift,
        idHistory,
        idHistoryDetail,
        status,
        quantityGift,
      },
    });
  };

  static detailRequest = (idRequest) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/request-manager/${idRequest}`,
    });
  };

  static conuntRequest = (type) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/count-request`,
      params: { type: type },
    });
  };

  static getPoint = (studentId, honeyCategoryId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-point-by-idStudent-idCategory`,
      params: { studentId, honeyCategoryId },
    });
  };
}
