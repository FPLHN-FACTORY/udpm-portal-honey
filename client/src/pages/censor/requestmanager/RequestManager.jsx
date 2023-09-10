import React from "react";
import TabsRequest from "./TabsRequest";
import { Card } from "antd";

export default function RequestManager() {
  return (
    <div>
      <TabsRequest selectIndex={0} />
      <Card>FILTER</Card>
      <Card className="m-25">TABLE</Card>
    </div>
  );
}
