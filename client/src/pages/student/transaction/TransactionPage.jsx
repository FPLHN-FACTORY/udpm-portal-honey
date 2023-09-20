import React, { useState } from "react";
import { Card, Spin, Steps } from "antd";
import "./index.css";
import CreateTransaction from "./CreateTransaction";
import VerifyTransaction from "./VerifyTransaction";
import ResultTransaction from "./ResultTransaction";

export default function TransactionPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  let content;

  if (current === 0) {
    content = (
      <CreateTransaction
        setData={setData}
        setCurrent={setCurrent}
        setLoading={setLoading}
      />
    );
  } else if (current === 1) {
    content = (
      <VerifyTransaction
        data={data}
        setCurrent={setCurrent}
        setLoading={setLoading}
      />
    );
  } else if (current === 2) {
    content = <ResultTransaction data={data} />;
  }

  return (
    <div className="create-transaction">
      <Spin spinning={loading}>
        <Card title="Giao dịch điểm">
          {current !== 2 && (
            <Steps
              current={current}
              items={[
                {
                  title: "Tạo giao dịch",
                },
                {
                  title: "Xác thực",
                },
                {
                  title: "Kết quả",
                },
              ]}
            />
          )}
          {content}
        </Card>
      </Spin>
    </div>
  );
}
