import { request } from "../../../helper/request.helper";

export class ConvertionHoneyAPI {
  static COMPONENT_NAME = "teacher/convertion-honey";

  static getUserAPiByCode = (code) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/user-api`,
      params: { code: code },
    });
  };
}
