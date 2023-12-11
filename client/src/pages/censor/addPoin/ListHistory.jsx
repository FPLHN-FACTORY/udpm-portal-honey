import React from "react";
import "./index.css";
import TabsHistory from "./TabsHistory";

export default function ListHistoryAddPoint() {
  return (
    <div className="request-manager">
      <TabsHistory selectIndex={1} />
    </div>
  );
}
