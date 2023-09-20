import { request } from "../../../helper/request.helper";

export class GiftAPI {
  static COMPONENT_NAME = "censor/gift";

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

  static detail = (data, id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one/${id}`,
      data: data,
    });
  };
  static fetchAllGift = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-gift`,
      params: filter,
    });
  };
}
