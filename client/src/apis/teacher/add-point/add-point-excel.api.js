import { request } from "../../../helper/request.helper";
export class AddPointExcelAPI {
  static COMPONENT_NAME = "teacher/list-students-add-point";

  static importExcel = (file) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/import-excel`,
      data: file,
    });
  };

  static exportExcel = () => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/export-excel`,
    });
  };

  static previewImportPoint = (file) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/create/preview-data`,
      data: file,
    });
  };
}
