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
    if (!isNaN(data.quantity) && data.quantity !== null) {
      formData.append("quantity", data.quantity);
    }
    if (!isNaN(data.limitQuantity) && data.limitQuantity !== null) {
      formData.append("limitQuantity", data.limitQuantity);
    }
    formData.append("status", data.status);
    formData.append("transactionGift", data.transactionGift);
    formData.append("type", data.type);
    if (data.fromDate !== null) {
      formData.append("fromDate", data.fromDate);
    }
    if (data.toDate !== null) {
      formData.append("toDate", data.toDate);
    }
    formData.append("note", data.note);
    formData.append("numberDateEnd", data.numberDateEnd);
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
    if (data.image !== null) {
      formData.append("image", data.image);
    }
    if (!isNaN(data.quantity) && data.quantity !== null) {
      formData.append("quantity", data.quantity);
    }
    if (!isNaN(data.limitQuantity) && data.limitQuantity !== null) {
      formData.append("limitQuantity", data.limitQuantity);
    }
    formData.append("status", data.status);
    formData.append("type", data.type);
    formData.append("transactionGift", data.transactionGift);

    if (data.fromDate !== null) {
      formData.append("fromDate", data.fromDate);
    }
    if (data.toDate !== null) {
      formData.append("toDate", data.toDate);
    }
    formData.append("note", data.note);
    formData.append("numberDateEnd", data.numberDateEnd);
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/${id}`,
      data: formData,
    });
  };

  static delete = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
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
