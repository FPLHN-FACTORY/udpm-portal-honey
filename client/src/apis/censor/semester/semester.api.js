import { request } from "../../../helper/request.helper";

export class SemesterAPI {
  static COMPONENT_NAME = "censor/semester";

  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/add`,
      data: data,
    });
  };

  static update = (data, id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/${id}`,
      data: data,
    });
  };

  static delete = (id) => {
    return request({
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
    });
  };

  static detail = (data, id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one/${id}`,
      data: data,
    });
  };
  static fetchAllSemester = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list`,
    });
  };
}
