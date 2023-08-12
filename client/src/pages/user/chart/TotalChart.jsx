import React, { memo, useState, useEffect } from "react";
import { Button, Col, Divider, Row, Space } from "antd";
import LineChart from "./LineChart";
import CombinedChart from "./MultipChart";
import DonutChart from "./DonutChart";
import "./index.css";
import { Line } from "@ant-design/plots";
import { CharArticleAPI } from "../../../apis/user/auth/chart/chart-article.api";
// import {
//   GetArticles,
//   SetArticles,
// } from "../../../app/reducers/articles/articles.reducer";

const TotalChart = memo(() => {
  const [activeChart, setActiveChart] = useState("article");
  const [getArticlesData, setArticlesData] = useState([]);

  const fetchArticle = () => {
    CharArticleAPI.getArticleByDate().then((response) => {
      const convertedData = response.data.data.map((item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}/${month}/${day}`;

        return {
          ...item,
          date: formattedDate,
        };
      });
      console.log(convertedData);
      setArticlesData(convertedData);
    });
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  // const asyncFetch = () => {
  //   fetch(
  //     "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log("fetch data failed", error);
  //     });
  // };

  const config = {
    data: getArticlesData,
    padding: "auto",
    xField: "date",
    yField: "numberArticle",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          marginTop: "20px",
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <Row className="flex justify-between ">
          <Col xl={23} className="mb-4 ">
            <Space
              className="mr-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
              split={<Divider type="vertical" />}
            >
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("article")}
                className={activeChart === "article" ? "active-button" : ""}
              >
                Bài viết
              </Button>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("comment")}
                className={activeChart === "comment" ? "active-button" : ""}
              >
                Bình luận
              </Button>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("status")}
                className={activeChart === "status" ? "active-button" : ""}
              >
                Cảm xúc
              </Button>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("all")}
                className={activeChart === "all" ? "active-button" : ""}
              >
                Tất cả
              </Button>
            </Space>
          </Col>
        </Row>
        {activeChart === "article" && <Line {...config} />}
        {activeChart === "comment" && <LineChart />}
        {activeChart === "status" && <LineChart />}
        {activeChart === "all" && <CombinedChart />}
      </div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          marginTop: "20px",
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <Row>
          <Col xs={8}>
            <DonutChart></DonutChart>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default TotalChart;
