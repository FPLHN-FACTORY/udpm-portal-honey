import { Tabs } from "antd";
import "./index.css";
import RequestGift from "./ListRequestGift";
import HistoryAddPoint from "./ListRequestAddPoint";

export default function TabsRequestPresident() {
  // eslint-disable-next-line no-sparse-arrays
  const items = [
    {
      key: "1",
      label: "Mật ong",
      children: <HistoryAddPoint />,
    },
    {
      key: "2",
      label: "Vật phẩm",
      children: <RequestGift />,
    },
    ,
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
