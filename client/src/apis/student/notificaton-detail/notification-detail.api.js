import { request } from "../../../helper/request.helper";

export class NotificationDetailAPI {
  static COMPONENT_NAME = "student/notification-detail";

  static fetchAllByIdStudentAndIdNotification = (idNotification) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/${idNotification}`,
    });
  };

  static receivingGiftsFromNotifications = (lstIdNotificationDetail, id) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/receiving/${id}`,
      data: lstIdNotificationDetail,
    });
  };

  static getOneNotificationById = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/notification/${id}`,
    });
  };

  static updateStatus = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/updateStatus/${id}`,
    });
  };
}
