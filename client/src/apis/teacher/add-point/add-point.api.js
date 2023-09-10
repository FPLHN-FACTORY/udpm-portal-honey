import { request } from "../../../helper/request.helper";

export class AddPointAPI {
  static COMPONENT_NAME = "teacher/add-point";

  //UserAPI
  static getUserAPiByCode = (code) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api`,
      params: { code: code },
    });
  };
  static getUserAPiById = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api/${id}`,
    });
  };

  static getCategory = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/category`,
    });
  };
  static getHoney = (studentId, categoryId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-honey`,
      params: { studentId, categoryId },
    });
  };
  static getHistory = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-history`,
      params: filter,
    });
  };
  static changeStatus = (idHistory, status) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/change-status`,
      data: { idHistory, status },
    });
  };
  static addPoint = (dataAddPoint) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: dataAddPoint,
    });
  };
}
