import { request } from "../../../helper/request.helper";

export class ConversionAPI {
  static COMPONENT_NAME = "censor/conversion";

  static fetchAllConversion = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-conversion`,
      params: filter,
    });
  };

  static detail = (data, id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one/${id}`,
      data: data,
    });
  };

  static update = (data, id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/update/${id}`,
      data: data,
    });
  };
  static add = (data) => {
    return request({
      method: "post",
      url: `/${this.COMPONENT_NAME}/add`,
      data: data,
    });
  };

  static searchByName = (page, textSearch) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/search-by-name?page=${page}&textSearch=${textSearch}`,
    });
  };

  static fetchAllPage = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/page`,
      params: filter,
    });
  };
}
