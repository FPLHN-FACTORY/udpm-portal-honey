import { request } from "../../../helper/request.helper";

export class HistoryApi {
  static COMPONENT_NAME = "student/history";

  static getAllHistory = (param) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: { ...param },
    });
  };
  static getAllRequest = (param) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/request`,
      params: { ...param },
    });
  };
}
