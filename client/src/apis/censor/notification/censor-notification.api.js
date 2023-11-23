import { request } from "../../../helper/request.helper";

export class NotificationAPI {
  static COMPONENT_NAME = "censor/notifications";

  static fetchAllNotification = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
    });
  };

  static fetchCountNotification = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/count`,
    });
  };
}
