import { request } from "../../../helper/request.helper";

export class TransactionApi {
  static COMPONENT_NAME = "student/transaction";

  static getCategory = (recipientId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/category`,
    });
  };

  static getGift = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-gift`,
    });
  };

  static searchStudent = (email) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/search-student`,
      params: email,
    });
  };
  static getHoney = (categoryId) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-honey`,
      params: { categoryId },
    });
  };
  static doneTransaction = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: { ...data },
    });
  };
}
