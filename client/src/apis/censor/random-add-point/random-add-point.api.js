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

  static createExportExcel = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/create/export`,
      responseType: "blob",
      params: filter,
    });
  };

  static previewDataExportExcel = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/export/data`,
      responseType: "blob",
      params: filter,
    });
  };

  static previewDataRandomExcel = (importExcel) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/preview-data-random`,
      data: importExcel,
    });
  };

  static createImportData = (dataPreview) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/import-data`,
      data: dataPreview,
    });
  };

  static createPreviewImportExcel = (importExcel) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/preview-data`,
      data: importExcel,
    });
  };

  static getAllChest = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-all-chest`,
    });
  };

  static getAllGiftByChest = (idChest) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-all-gift-by-chest/${idChest}`,
    });
  };

  static getChestById = (idChest) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-chest-by-id/${idChest}`,
    });
  };

  static deleteChestGift = (idChest, idGift) => {
    return request({
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}/delete/chest-gift`,
      params: { idChest, idGift },
    });
  };

  static getAllNameChest = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/get-all-name-chest`,
    });
  };

  static addChest = (name) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/add/chest/${name}`,
    });
  };
}
