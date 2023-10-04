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
}