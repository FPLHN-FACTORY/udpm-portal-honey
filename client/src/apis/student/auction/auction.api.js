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

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one-aution?id=${id}`,
    });
  };

  static getOneRoom = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one-room?id=${id}`,
    });
  };

  static addAuction = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/add-auction`,
      data: data,
    });
  };
}
