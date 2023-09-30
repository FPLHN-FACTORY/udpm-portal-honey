import { request } from "../../../helper/request.helper";

export class ArchiveAPI {
  static COMPONENT_NAME = "student/archive";

  static getArchive = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };
}
