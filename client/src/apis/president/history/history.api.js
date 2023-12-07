import { request } from "../../../helper/request.helper";

export class PresidentHistoryAPI {
  static COMPONENT_NAME = "president";

  static getHoneyHistory = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/history-honey`,
      params: filter,
    });
  };

  static getGiftHistory = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/history-gift`,
      params: filter,
    });
  };

}
