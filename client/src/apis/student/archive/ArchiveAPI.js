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

  static delete = (id) => {
    return request({
      method: "DELETE",
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static update = (id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static openChest = (idChest) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: {
        chestId: idChest,
      },
    });
  };
}
