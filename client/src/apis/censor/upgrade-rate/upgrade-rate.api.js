import { request } from "../../../helper/request.helper";

export class UpgradeApi {
  static COMPONENT_NAME = "censor/upgrade-rate";

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
      url: `/${this.COMPONENT_NAME}` + `/add`,
      data: data,
    });
  };

  static getALLCategory = () => {
    return request({
      method: "GET",
      url: `/censor/category/list-category`,
    });
  };

  static getAllCensorExist = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}` + `/get-all-gift-exist`,
    });
  };

  static update = (data, id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}` + `/update/` + id,
      data: data,
    });
  };

  static delete = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
    });
  };

  static changeStatus = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}` + `/change-status/` + id,
    });
  };
}
