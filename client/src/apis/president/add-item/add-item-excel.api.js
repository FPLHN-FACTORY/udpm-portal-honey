import { request } from "../../../helper/request.helper";
export class AddItemExcelAPI {
  static COMPONENT_NAME = "president";

  static importExcel = (file) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/import-data`,
      data: file,
    });
  };

  static exportExcel = () => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/export`,
    });
  };

  static previewDataExportExcel = (file) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/preview-data`,
      data: file,
    });
  };
}
