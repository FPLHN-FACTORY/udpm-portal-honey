import { Tabs } from "antd";
import "./index.css";
import HoneyHistory from "./HoneyHistory";
import GiftHistory from "./GiftHistory";

export default function TabsHistory() {
  const items = [
    {
      key: "1",
      label: "Mật ong",
      children: <HoneyHistory />,
    },
    {
      key: "2",
      label: "Vật phẩm",
      children: <GiftHistory />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
