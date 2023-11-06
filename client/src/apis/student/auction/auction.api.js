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

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one-aution?id=${id}`,
    });
  };

  static addAuction = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/add-auction`,
      data: data,
    });
  };

  static fetchRoom = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/search`,
      params: filter,
    });
  };

  static updateLastPrice = (idAuction, lastPrice) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/update-last-price-auction?idAuction=${idAuction}&lastPrice=${lastPrice}`,
    });
  };
}
