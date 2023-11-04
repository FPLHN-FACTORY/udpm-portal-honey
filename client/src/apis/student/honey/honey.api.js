import { request } from "../../../helper/request.helper";

export class StudentHoneyAPI {
  static COMPONENT_NAME = "student/honey";

  static getOne = (idUser, idCategory) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one-user-category?idUser=${idUser}&idCategory=${idCategory}`,
    });
  };
}
