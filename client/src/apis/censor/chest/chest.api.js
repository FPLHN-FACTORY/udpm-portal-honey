import { request } from "../../../helper/request.helper";

export class ChestAPI {
  static COMPONENT_NAME = "censor/chest";

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
      url: `/${this.COMPONENT_NAME}`,
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
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
    });
  };
}
