import { Tabs } from "antd";
import "./index.css";
import HistoryAddPoint from "./HistoryAddPoint";
import HistoryGift from "./HistoryGift";

export default function TabsHistory() {
  const items = [
    {
      key: "1",
      label: "Mật ong",
      children: <HistoryAddPoint />,
    },
    {
      key: "2",
      label: "Vật phẩm",
      children: <HistoryGift />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
