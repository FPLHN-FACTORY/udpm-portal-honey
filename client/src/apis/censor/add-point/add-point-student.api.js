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

  
}
