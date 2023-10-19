import { request } from "../../../helper/request.helper";

export class StudentAuctionAPI {
  static COMPONENT_NAME = "student/auction";

  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/find-all`,
      params: filter,
    });
  };

  static fetchAllRoom = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/find-all-room`,
      params: filter,
    });
  };
}
