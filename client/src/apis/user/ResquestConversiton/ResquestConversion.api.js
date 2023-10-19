import { request } from "../../../helper/request.helper";

export class ResquestConversion {
  static COMPONENT_NAME = "student/createResquest";

  //UserAPI
  static getUserAPi = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api`,
    });
  };

  static getUserAPiByid = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api`,
    });
  };

  static fetchAllCategory = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-category`,
    });
  };

  static getPointHoney = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/honey-point`,
      params: filter,
    });
  };

  static getHistory = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/history`,
      params: filter,
    });
  };

  static createRequest = (createRequest) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create-resquest-conversion`,
      data: createRequest,
    });
  };

  static changeGift = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/change-gift`,
      data: data,
    });
  };

  static deleteRequest = (id) => {
    return request({
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
    });
  };
}
