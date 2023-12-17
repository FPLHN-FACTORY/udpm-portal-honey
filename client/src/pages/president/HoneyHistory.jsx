import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import { SearchOutlined } from "@ant-design/icons";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { CategoryAPI } from "../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../apis/censor/request-manager/requestmanager.api";
import {
  GetHistory,
  SetHistory,
} from "../../app/reducers/history/history.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PresidentHistoryAPI } from "../../apis/president/history/history.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const statusHistory = (status) => {
  switch (status) {
    case 1:
      return <Tag color="green">Đã phê duyệt</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function HoneyHistory() {
  const dispatch = useAppDispatch();
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: null });

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    dispatch(SetHistory([]));
    CategoryAPI.fetchAllCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        const fetchData = async (filter) => {
          try {
            const response = await PresidentHistoryAPI.getHoneyHistory(filter);
            const listHistory = await Promise.all(
              response.data.data.map(async (data) => {
                try {
                  const user = await RequestManagerAPI.getUserAPiById(
                    data.studentId
                  );
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
            setTotalPage(response.data.totalPages);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData(filter);
      });
  };

  const data = useAppSelector(GetHistory).map((data) => {
    return {
      ...data,
      key: data.id,
      status: statusHistory(data.status),
      changedDate: moment(data.changedDate).format("DD-MM-YYYY HH:mm:ss"),
      acction: { idHistory: data.id, status: data.status },
    };
  });

  const listCategory = useAppSelector(GetCategory);

  const onFinishSearch = (value) => {
    if (value.userName === undefined || value.userName.trim().length === 0) {
      setFilter({
        ...filter,
        idStudent: null,
        idCategory: value.idCategory,
        status: value.status,
      });
    } else {
      RequestManagerAPI.getUserAPiByCode(value.userName.trim())
        .then((result) => {
          if (result.data.success) {
            setFilter({
              ...filter,
              idStudent: result.data.data.id,
              idCategory: value.idCategory,
              status: value.status,
            });
          } else {
            message.error("User name sinh viên không chính xác!");
          }
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="request-manager" id="honey_history">
      <Card className="mb-2">
        <Form onFinish={onFinishSearch}>
          <Row className="justify-between">
            {/* <Spa  ce size={"large"}> */}

            <Col lg={11} sm={24} className="w-full">
              <div className="relative w-full">
                <Form.Item name="userName" className="search-input">
                  <Input
                    style={{ height: "40px" }}
                    name="userName"
                    // size="small"
                    placeholder="Nhập user name sinh viên cần tìm"
                    prefix={<SearchOutlined />}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col lg={12} sm={24} className="w-full ml-2">
              <Row >
                <Col lg={18}>
                <Form.Item name={"idCategory"}>
                  <Select
                    // style={{ width: "450px" }}className="justify-between"
                    size="large"
                    placeholder="Loại điểm"
                    options={[
                      { value: null, label: "Tất cả" },
                      ...listCategory.map((category) => {
                        return {
                          value: category.id,
                          label: category.name,
                        };
                      }),
                    ]}
                  />
                </Form.Item></Col>
                <Col lg={4}>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="ml-3 search-button"
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>{" "}</Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title={
          <>
            <FontAwesomeIcon
              className="mr-2"
              icon={faRectangleList}
              size="xl"
            />
            Lịch sử cộng điểm{" "}
          </>
        }
      >
        {data.map((item) => (
          <div className="list__point ">
            <h3 className="text-slate-600"> Sinh viên {item.nameStudent}</h3>
            <div className="list__point__title">
              <p>
                <strong className="text-slate-500 mr-[8px]">
                  {item.acction.status == 2
                    ? "Đã bị hủy yêu cầu tặng: "
                    : "Đã nhận được: "}
                </strong>
                {item.honey}
              </p>
              <p>
                <strong className="text-slate-500 mr-[8px]">Thời gian:</strong>
                {item.changedDate}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-10 text-center mb-10">
          <Pagination
            simple
            current={filter.page + 1}
            onChange={(page) => {
              setFilter({ ...filter, page: page - 1 });
            }}
            total={totalPage * 10}
          />
        </div>
      </Card>
    </div>
  );
}
