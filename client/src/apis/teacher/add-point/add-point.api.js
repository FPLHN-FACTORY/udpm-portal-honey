import { request } from "../../../helper/request.helper";

export class AddPointAPI {
  static COMPONENT_NAME = "teacher/add-point";

  static searchStudent = (username) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/search-student`,
      params: { username },
    });
  };
  static getStudent = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-student`,
      params: { id },
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
