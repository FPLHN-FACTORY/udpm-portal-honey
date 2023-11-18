import { request } from "../../../helper/request.helper";

export class UpgradeRateApi {
  static COMPONENT_NAME = "student/upgrade-rate";

  static getArchiveByStudent = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/archive`,
      params: filter,
    });
  };

  static getUpgradeRate = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };

  static getGiftCondition = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/condition`,
      params: { id },
    });
  };

  static update = (filter) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/update`,
      data: filter,
    });
  };
}
