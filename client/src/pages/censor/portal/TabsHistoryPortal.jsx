import { Tabs } from "antd";
import "./index.css";
import EventHistory from "./EventHistory";
import ProjectHistory from "./ProjectHistory";
import React from "react";

export default function TabsHistoryPortal() {
  const items = [
    {
      key: "1",
      label: "Sự kiện",
      children: <EventHistory />,
    },
    {
      key: "2",
      label: "Xưởng dự án",
      children: <ProjectHistory />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
