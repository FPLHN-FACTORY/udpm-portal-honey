import { request } from "../../../helper/request.helper";

export class CategoryAPI {
  static COMPONENT_NAME = "censor/category";

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
    formData.append("categoryStatus", data.categoryStatus);
    formData.append("transactionRights", data.transactionRights);
    formData.append("image", data.image);
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: formData,
    });
  };

  static update = (data, id) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("name", data.name.trim());
    formData.append("categoryStatus", data.categoryStatus);
    formData.append("transactionRights", data.transactionRights);
    if (data.image.length !== 0) {
      formData.append("image", data.image);
    }
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
  static fetchAllCategory = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-category`,
      params: filter,
    });
  };
}
