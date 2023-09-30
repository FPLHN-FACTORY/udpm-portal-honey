import { request } from "../../../helper/request.helper";

export class ChestGiftAPI {
  static COMPONENT_NAME = "censor/chest-gift";

  static getChestGift = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static addGiftToChest = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/add-gift`,
      data: data,
    });
  };

  static getGiftNotJoinChest = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-gift`,
      params: {
        id: id,
      },
    });
  };

  static deleteGift = (data) => {
    return request({
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}/delete-gift`,
      data: data,
    });
  };

  static deleteChest = (id) => {
    return request({
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
    });
  };
}
