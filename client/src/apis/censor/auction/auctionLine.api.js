import { request } from "../../../helper/request.helper";

export class AuctionChartAPI {
  static COMPONENT_NAME = "censor/auction/chart";
  static fetchLine = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/line`,
      params: filter,
    });
  };
  static fetchTables = (filter) => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/tables`,
      params: filter,
    });
  };
  static fetchStatistic = () => {
    return request({
      method: "GET",
      url: `/${this.COMPONENT_NAME}/statistic`,
    });
  };
}
