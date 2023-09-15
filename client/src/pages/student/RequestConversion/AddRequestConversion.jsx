import { EyeOutlined } from "@ant-design/icons";
import { Card, Input, Tooltip } from "antd";
import React from "react";

export default function AddRequestConversion() {
  return (
    <>
      <Card className="mb-2">
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "10px", width: "40%" }}
              placeholder="Tìm kiếm tên hoặc mã..."
            />
          </div>
        </form>
      </Card>
    </>
  );
}
