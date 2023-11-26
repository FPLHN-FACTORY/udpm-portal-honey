import { request } from "../../../helper/request.helper";
export class AddItemExcelAPI {
  static COMPONENT_NAME = "president";

  static importExcel = (dataPreview) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/import-data`,
      data: dataPreview,
    });
  };

  // static exportExcel = () => {
  //   return request({
  //     method: "POST",
  //     url: `${this.COMPONENT_NAME}/export`,
  //   });
  // };

  static exportExcel(filter) {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/export`,
      responseType: "blob",
      params: filter,
    });
  }

  static previewDataExportExcel = (file) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/preview-data`,
      data: file,
    });
  };
}
