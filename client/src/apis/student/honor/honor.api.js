import { request } from "../../../helper/request.helper";

export class StudenHallOfFameAPI {
  static COMPONENT_NAME = "student/hall-of-fame";

  static getTop3Student = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/top-3`,
    });
  };
  static getPageStudent = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };
  static detailProfile = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/profile/${id}`,
    });
  };
  static detailStudent = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/student/${id}`,
    });
  };
}
