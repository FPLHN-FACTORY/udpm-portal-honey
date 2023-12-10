import { Tabs } from "antd";
import RequestConversionHistory from "./RequestConversionHistory";
import "./index.css";
import RequestAddPoint from "./RequestAddPoint";

export default function TabsRequest() {
  // eslint-disable-next-line no-sparse-arrays
  const items = [
    {
      key: "1",
      label: "Mật ong",
      children: <RequestAddPoint />,
    },
    {
      key: "2",
      label: "Vật phẩm",
      children: <RequestConversionHistory />,
    },
    ,
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
