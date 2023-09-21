import { request } from "../../../helper/request.helper";

export class ConvertionHoneyAPI {
  static COMPONENT_NAME = "teacher/convertion-honey";

  static getConvertion = (categoryId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: { categoryId },
    });
  };

  static getHoney = (studentId, categoryId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-honey`,
      params: { studentId, categoryId },
    });
  };

  static addConvertion = (dataAddConvertion) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: dataAddConvertion,
    });
  };
}
