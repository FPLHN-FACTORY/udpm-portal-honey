import { request } from "../../../helper/request.helper";

export class TeacherUseGiftApi {
  static COMPONENT_NAME = "teacher/use-gift";

  static getRequestUseGift = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };
  static getFilterClass = () => {
    return request({  
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-filter/class`,
    });
  };
  static getFilterGift = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-filter/gift`,
    });
  };
  static accpect = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/accept/${id}`,
    });
  };
  static cancel = (id, note) => {
    return request({
      method: "Post",
      url: `/${this.COMPONENT_NAME}/cancel/${id}`,
      data: { note: note },
    });
  };
}
