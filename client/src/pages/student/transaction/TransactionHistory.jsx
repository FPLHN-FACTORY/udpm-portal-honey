import { Button, Card, Col, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetHistory,
  SetHistory,
} from "../../../app/reducers/history/history.reducer";
import moment from "moment";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import localization from "moment/locale/vi";

export default function TransactionHistory() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  let [userLogin, setUserLogin] = useState();

  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState({ page: 0, size: 4 });
  const [filterDate, setFilterDate] = useState({ toDate: "", fromDate: "" });

  useEffect(() => {
    TransactionApi.getUserLogin().then((user) => {
      setUserLogin(user.data);
    });
  }, []);

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    setLoading(true);
    const fetchData = async (filter) => {
      try {
        const response = await TransactionApi.getHistory(filter);
        const listHistory = await Promise.all(
          response.data.data.map(async (data) => {
            try {
              const user = await TransactionApi.getStudent(data.studentId);
              return {
                ...data,
                nameStudent: user.data.data.name,
                userName: user.data.data.userName,
              };
            } catch (error) {
              console.error(error);
              return data;
            }
          })
        );
        dispatch(SetHistory(listHistory));
        console.log(response.data);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData(filter);
  };

  const submitFilter = () => {
    setFilter({ ...filter, ...filterDate });
  };

  const data = useAppSelector(GetHistory).map((data) => {
    return {
      ...data,
      key: data.id,
      changeDate: moment(data.changeDate).format("HH:mm dddd DD-MM-YYYY"),
    };
  });

  return (
    <Spin spinning={loading}>
      <div className="add-point">
        <div
          className="mb-25 mt-25"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 150px",
          }}>
          <div style={{ marginRight: "10px", width: "40%" }}>
            <p style={{ margin: 0, fontWeight: "500" }}>Từ ngày</p>
            <Input
              type="date"
              onChange={(e) => {
                setFilterDate({
                  ...filterDate,
                  fromDate: moment(e.target.value).valueOf(),
                });
              }}
            />
          </div>
          <div style={{ marginRight: "10px", width: "40%" }}>
            <p style={{ margin: 0, fontWeight: "500" }}>Đến ngày</p>
            <div style={{ display: "flex" }}>
              <Input
                onChange={(e) => {
                  setFilterDate({
                    ...filterDate,
                    toDate: moment(e.target.value).add(1, "day").valueOf(),
                  });
                }}
                type="date"
                style={{ marginRight: "10px" }}
              />
              <Button
                onClick={submitFilter}
                className="search-button"
                type="primary"
                style={{ margin: 0 }}>
                Lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-10 mt-25" style={{ padding: "0px 150px" }}>
          {data.map((item, index) => {
            return (
              <Card
                key={`cardhistory${index}`}
                style={{ boxShadow: "none" }}
                className=" mt-10 card-history">
                <Row style={{ padding: "10px 15px" }}>
                  <Col span={12}>
                    <div style={{ color: "gray", fontSize: "12px" }}>
                      <i>{item.changeDate}</i>
                    </div>
                    <div style={{ fontWeight: "500", fontSize: "15px" }}>
                      {item.note}
                    </div>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <div style={{ color: "gray", fontSize: "12px" }}>
                      <i>{item.nameCategory}</i>
                    </div>
                    <div
                      style={{
                        fontWeight: "500",
                        fontSize: "15px",
                        color: item.studentId === userLogin ? "green" : "red",
                      }}>
                      {item.studentId === userLogin ? "+" : "-"}
                      {item.honeyPoint} điểm
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </div>
        <div style={{ textAlign: "center" }} className="mb-25">
          {totalPage > 1 && (
            <Button
              onClick={() => {
                setFilter({ ...filter, size: filter.size + 4 });
              }}>
              Xem thêm
            </Button>
          )}
        </div>
      </div>
    </Spin>
  );
}
