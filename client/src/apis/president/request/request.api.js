import { request } from "../../../helper/request.helper";

export class PresidentRequestAPI {
  static COMPONENT_NAME = "president";

  static getHoneyRequest = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-request-honey`,
      params: filter,
    });
  };

  static getGiftRequest = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-request-gift`,
      params: filter,
    });
  };

  static changeStatus = (idHistory) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/change-status`,
      data: { idHistory },
    });
  };
}
