import { request } from "../../../helper/request.helper";

export class UpgradeRateApi {
  static COMPONENT_NAME = "student/upgrade-rate";

  static getArchiveByStudent = (type) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/archive`,
      params: { type },
    });
  };

   static getArchive = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };
}
