import { request } from "../../../helper/request.helper";

export class ClubAPI {
  static COMPONENT_NAME = "censor/club";

  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}`,
      params: filter,
    });
  };

  static fetchGitInClub = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/gift`,
      params: filter,
    });
  };

  static fetchGitNotInClub = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/gift-not-in-club`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: data,
    });
  };

  static createGiftClub = (data) => {
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}/create/gift-club`,
      data: data,
    });
  };


  static update = (data, id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/${id}`,
      data: data,
    });
  };

  static delete = (data, id) => {
    return request({
      method: "PUT",
      url: `/${this.COMPONENT_NAME}/delete/${id}`,
      data: data,
    });
  };

  static detail = (id) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static fetchAllClub = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list-gift`,
      params: filter,
    });
  };
}
