import { request } from "../../../helper/request.helper";

export class GiftDetail {
  static COMPONENT_NAME = "censor/gift-detail";

  static fetchAll = (idGift) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/list?idGift=${idGift}`,
    });
  };

  static create = (data) => {
    const formData = new FormData();
    formData.append("giftId", data.giftId);
    formData.append("categoryId", data.categoryId);
    formData.append("honey", data.honey);
    return request({
      method: "POST",
      url: `/${this.COMPONENT_NAME}`,
      data: formData,
    });
  };

  //   static update = (data, id) => {
  //     const formData = new FormData();
  //     formData.append("giftId", data.giftId);
  //     formData.append("categoryId", data.categoryId);
  //     formData.append("honey", data.honey);
  //     return request({
  //       method: "PUT",
  //       url: `/${this.COMPONENT_NAME}/${id}`,
  //       data: formData,
  //     });
  //   };
}
