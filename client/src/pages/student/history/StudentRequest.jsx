import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./index.css";
import { Col, Image, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { HistoryApi } from "../../../apis/student/history/historyApi.api";

export default function StudentRequest() {
  const [data, setData] = useState([]);
  const [type, setType] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const [lastElementRef, inView] = useInView();

  function fetchData(type, page) {
    setIsFetching(true);
    HistoryApi.getAllRequest({ type: type, page: page }).then((result) => {
      setData((prevData) => [...prevData, ...result.data.data.data]);
      setTotal(result.data.data.totalPages);
      setIsFetching(false);
    });
  }
  useEffect(() => {
    setData([]);
    setPage(0);
  }, [type]);

  useEffect(() => {
    fetchData(type, page);
  }, [type, page]);

  useEffect(() => {
    if (inView && !isFetching && page < total) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching]);

  return (
    <div className="student__history">
      <div className="wapper">
        <div className="button-group">
          <button
            className="button button__notactivebutton__notactive"
            onClick={() => navigate("/student/history")}
          >
            Lịch sử
          </button>
          <button
            className="button button__active"
            onClick={() => navigate("/student/request")}
          >
            Yêu cầu
          </button>
          <Select
            className="select__history"
            style={{ width: "150px" }}
            value={type}
            onChange={(e) => setType(e)}
            options={[
              {
                value: null,
                label: "Tất cả",
              },
              {
                value: 2,
                label: "Mua Quà",
              },
              {
                value: 3,
                label: "Mở Quà",
              },
            ]}
          />
        </div>
        <hr className="separator" />
        <div className="wapper__content">
          {data.map((e, index) => {
            if (data.length === index + 1) {
              return (
                <div className={`content red`} ref={lastElementRef} key={index}>
                  <img className="size_img" src={e.image} alt="" />
                  <div className="student__history__text">{e.content}</div>
                  <div className={`student__history__point}`}>
                    <div
                      className={`student__history__point 
                    }`}
                    >
                      {e.point && (
                        <span
                          className={"red__text"}
                          style={{ marginRight: "10px" }}
                        >
                          {e.point}
                        </span>
                      )}
                      {e.point && e.pointGet && "| "}
                      {e.pointGet && (
                        <span
                          className={"green__text"}
                          style={{ marginRight: "10px" }}
                        >
                          {e.pointGet}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className={`content red`} key={index}>
                  <Row>
                    <Col span={10}>
                      <img className="size_img" src={e.image} alt="" />
                    </Col>
                    <Col span={10}>
                      <div className="student__history__text">{e.content}</div>
                    </Col>
                    <Col span={10}>
                      <div className={`student__history__point}`}>
                        <div
                          className={`student__history__point 
                    }`}
                        >
                          {e.point && (
                            <span
                              className={"red__text"}
                              style={{ marginRight: "10px" }}
                            >
                              {e.point}
                            </span>
                          )}
                          {e.point && e.pointGet && "| "}
                          {e.pointGet && (
                            <span
                              className={"green__text"}
                              style={{ marginRight: "10px" }}
                            >
                              {e.pointGet}
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
