import { request } from "../../../helper/request.helper";

export class RequestManagerAPI {
  static COMPONENT_NAME = "censor/request-manager";

  //UserAPi
  static getUserAPiByCode = (code) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api`,
      params: { code: code },
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
  static changeStatus = (idHistory, status) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/change-status`,
      data: { idHistory, status },
    });
  };

  static detailRequest = (idRequest) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/request-manager/${idRequest}`,
    });
  };
}
