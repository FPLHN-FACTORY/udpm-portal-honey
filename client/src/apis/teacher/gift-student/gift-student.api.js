import { request } from "../../../helper/request.helper";
export class GiftStudentAPI {
  static COMPONENT_NAME = "teacher/list-students";

  static export = () => {
    return request({
      method: "GET",
      url: `${this.COMPONENT_NAME}/download-template`,
    });
  };

  static importExcel = (file) => {
    return request({
      method: "POST",
      url: `${this.COMPONENT_NAME}/import-excel`,
      data: file,
    });
  };
}
