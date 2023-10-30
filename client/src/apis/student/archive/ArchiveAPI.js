import { request } from "../../../helper/request.helper";

export class ArchiveAPI {
  static COMPONENT_NAME = "student/archive";

  static getArchive = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };

  static getGift = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-gift`,
      params: filter,
    });
  };

  static getChest = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-chest`,
    });
  };

  static detail = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static openGift = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/use-gift`,
      data: data,
    });
  };

  static update = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static openChest = (idChest) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/open-chest`,
      data: {
        chestId: idChest,
      },
    });
  };

  static detailArchiveGift = (idGift) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/detail`,
      params: {
        idGift: idGift,
      },
    });
  };

  static detailArchiveChest = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/detail-chest`,
      params: {
        idChest: id,
      },
    });
  };

  static findAllUser = (id, idCategory) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/find-all-user?id=${id}&idCategory=${idCategory}`,
    });
  };
}
