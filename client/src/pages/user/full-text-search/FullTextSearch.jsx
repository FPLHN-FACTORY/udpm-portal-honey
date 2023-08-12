import {
  AuditOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row, Skeleton } from "antd";
import React, { memo, useEffect, useState } from "react";
import ResultUser from "./ResultUser";
// import ArticleFullTS from "./ArticleFullTS";
import AllFullTS from "./AllFullTS";
import { useLocation } from "react-router";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Tat ca", "1", <AuditOutlined style={{ fontSize: "25px" }} />),
  {
    type: "divider",
  },
  getItem("Bai viet", "2", <FileTextOutlined style={{ fontSize: "25px" }} />),
  {
    type: "divider",
  },
  getItem(
    "Moi nguoi",
    "3",
    <UsergroupAddOutlined style={{ fontSize: "25px" }} />
  ),
];
const FullTextSearch = memo(() => {
  const [search, setSearch] = useState();
  // const location = useLocation();
  // useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    // const searchValue = searchParams.get('search');
    // setSearch(searchValue)
  // }, [location]);

  const [selectedItem, setSelectedItem] = useState("1");
  const onClick = (e) => {
    const item = e.key;
    setSelectedItem(item);
  };
  return (
    <div>
      <Row className="ml-2">
        <Col xs={17} className="mr-7">
          {selectedItem === "3" ? <ResultUser /> : null}
          {/* {selectedItem === "2" ? <ArticleFullTS /> : null} */}
          {selectedItem === "1" ? <AllFullTS search={"h"} /> : null}
          <Skeleton
            className="mt-5"
            loading={true}
            active
            avatar={{ shape: "circle" }}
            title={{ width: 200 }}
            paragraph={{
              rows: 3,
              width: [650, 650, 650],
            }}
          >
            <h1>Data is available ow.</h1>{" "}
          </Skeleton>
        </Col>

        <Col xs={6}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
              fontSize: "18px",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
      </Row>
    </div>
  );
});

export default FullTextSearch;
