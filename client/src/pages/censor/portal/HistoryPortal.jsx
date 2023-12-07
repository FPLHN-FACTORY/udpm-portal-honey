import React from "react";
import "./index.css";
import TabsHistoryPortal from "./TabsHistoryPortal";

export default function HistoryPortal() {
  return (
    <div className="request-manager">
      <TabsHistoryPortal selectIndex={1} />
    </div>
  );
}
