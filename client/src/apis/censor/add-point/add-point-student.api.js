import { request } from "../../../helper/request.helper";

export class AddPointStudentAPI {
  static COMPONENT_NAME = "censor/add-point-student";

  static getCategory = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-category`,
    });
  };

  static createExportExcelEvent = () => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/portal-events/export`,
    });
  };

  static createExportExcelLab = () => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/lab-report/export`,
    });
  };

  static previewDataExcelEvent = (importExcel) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/portal-events/preview-data`,
      data: importExcel,
    });
  };

  static previewDatatExcelLab = (importExcel) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/lab-report/preview-data`,
      data: importExcel,
    });
  };

  static createImportDataLab = (dataPreview) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/lab-report/import-data`,
      data: dataPreview,
    });
  };

  static createImportDataEvent = (dataPreview) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/portal-events/import-data`,
      data: dataPreview,
    });
  };
}
