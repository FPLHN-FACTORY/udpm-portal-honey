import { request } from "../../../helper/request.helper";

export class ProfileApi {
  static COMPONENT_NAME = "student/profile";

  static getUserLogin = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
    });
  };

  static getHoneyUser = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/honey`,
    });
  };

  static checkCategoryUser = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/check-category`,
    });
  };
}
