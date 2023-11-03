import { Tabs } from "antd";
import "./index.css";
import RequestApprovedHistory from "./ApproveHistory";
import BuyGiftHistory from "./BuyGiftHistory";

export default function TabsHistory() {
  const items = [
    {
      key: "1",
      label: "Mật ong",
      children: <RequestApprovedHistory />,
    },
    {
      key: "2",
      label: "Vật phẩm",
      children: <BuyGiftHistory />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
