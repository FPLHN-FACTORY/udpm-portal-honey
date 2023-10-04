import { request } from "../../../helper/request.helper";

export class GiftAPI {
  static COMPONENT_NAME = "censor/gift";

  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };

  static create = (data) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("quantity", data.quantity);
    formData.append("status", "FREE");
    formData.append("type", data.type);

    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: formData,
    });
  };

  static update = (data, id) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("name", data.name);
    formData.append("image", data.image);
    if (!isNaN(data.quantity) || data.quantity === null) {
      formData.append("quantity", data.quantity);
    } else {
      formData.append("quantity", "");
    }
    formData.append("status", "FREE");
    formData.append("type", data.type);
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/${id}`,
      data: formData,
    });
  };

  static delete = (data, id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
      data: data,
    });
  };

  static detail = (data, id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-one/${id}`,
      data: data,
    });
  };
  static fetchAllGift = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-gift`,
      params: filter,
    });
  };
}
