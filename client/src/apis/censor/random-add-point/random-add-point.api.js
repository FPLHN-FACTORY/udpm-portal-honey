import { request } from "../../../helper/request.helper";

export class RandomAddPointAPI {
  static COMPONENT_NAME = "censor/random-add-point";
  static fetchAllCategory = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-all-category`,
    });
  };

  static fetchAllStudent = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-list-student?emailSearch=${filter.emailSearch}`,
    });
  };

  static createRandomPoint = (dataRandomPoint) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/random/point`,
      data: dataRandomPoint,
    });
  };

  static createRandomItem = (dataRandomItem) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/random/item`,
      data: dataRandomItem,
    });
  };

  static getGiftByType(typeNumber) {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get/gift-by-type?typeNumber=${typeNumber}`,
    });
  }

  static createExportExcel = () => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/export`,
    });
  };

  static createImportExcel = (importExcel) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/import`,
      data: importExcel,
    });
  };

  static fetchAllTypeGift = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-all-type-gift`,
    });
  };
}
