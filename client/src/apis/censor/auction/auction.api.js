import { request } from "../../../helper/request.helper";

export class AuctionAPI {
  static COMPONENT_NAME = "censor/auction";
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url:
        `/${this.COMPONENT_NAME}` +
        `/search?name=` +
        filter.name +
        `&status=` +
        filter.status +
        `&honeyCategoryId=` +
        filter.honeyCategoryId +
        `&page=` +
        filter.page +
        `&size=` +
        filter.size,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/add`,
      data: data,
    });
  };

  static getALLCategory = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-category`,
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
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}` + `/delete/` + id,
    });
  };

  static changeStatus = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}` + `/change-status/` + id,
    });
  };
}
