import { Tabs } from "antd";
import "./index.css";
import HistoryAddPoint from "./HistoryAddPoint";

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
      // children: <RequestConversionHistory />,
    },
    ,
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
