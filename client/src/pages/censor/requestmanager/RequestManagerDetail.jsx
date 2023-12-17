import { Button, Card, Descriptions, Space, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";

const type = (status) => {
  switch (status) {
    case 0:
      return <Tag color="yellow-inverse">Cộng điểm</Tag>; // Màu xanh dương
    case 1:
      return <Tag color="lime-inverse">Giao dịch</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="magenta-inverse">Đổi quà</Tag>; // Màu xanh dương nhạt
    default:
      return <Tag>Không xác định</Tag>;
  }
};
const statusHistory = (status) => {
  switch (status) {
    case 0:
      return <Tag color="geekblue">Chờ phê duyệt</Tag>; // Màu xanh dương
    case 1:
      return <Tag color="green">Đã phê duyệt</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    case 4:
      return <Tag color="geekblue">Chờ phê duyệt</Tag>;
    case 5:
      return <Tag color="geekblue">Chờ phê duyệt</Tag>;
    default:
      return <Tag>Không xác định</Tag>;
  }
};
const fomatDate = (date) => {
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
};

export default function RequestManagerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState({});
  const [student, setStudent] = useState({});
  const [sender, setSender] = useState({});
  const [idDetail, setIdDetail] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    let [idStudent, idNguoiGui] = "";
    await RequestManagerAPI.detailRequest(id)
      .then((response) => {
        if (response.data.success) {
          idStudent = response.data.data.studentId;
          idNguoiGui =
            response.data.data.teacherId || response.data.data.presidentId;
          setIdDetail(response.data.data.historyDetailId);
          setRequest(response.data.data);
        } else {
          navigate("/not-found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    await RequestManagerAPI.getUserAPiById(idStudent)
      .then((response) => {
        setStudent(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    await RequestManagerAPI.getUserAPiById(idNguoiGui)
      .then((response) => {
        setSender(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const changeStatus = (status) => {
    RequestManagerAPI.changeStatus(id, idDetail, status)
      .then((response) => {
        if (response.data.success) {
          fetchData();
          if (status === 1) message.success("Đã xác nhận yêu cầu!");
          if (status === 2) message.error("Hủy yêu cầu thành công!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="request-manager">
      {request.id !== null && (
        <Card
          className="m-25 request-manager-detail"
          title="Chi tiết yêu cầu"
          extra={
            request.status !== 2 &&
            request.status !== 1 && (
              <Space size={"middle"}>
                <Button
                  onClick={() => changeStatus(1)}
                  type="primary"
                  style={{ backgroundColor: "#EEB30D" }}
                >
                  Phê duyệt
                </Button>
                <Button onClick={() => changeStatus(2)} type="primary" danger>
                  Từ chối
                </Button>
              </Space>
            )
          }
        >
          <Descriptions title="Nội dung yêu cầu">
            <Descriptions.Item label="Loại yêu cầu">
              {type(request.type)}
            </Descriptions.Item>
            <Descriptions.Item label="Loại mật ong">
              {request.honey}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {fomatDate(request.createDate)}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {statusHistory(request.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày phê duyệt">
              {request.changeDate
                ? fomatDate(request.changeDate)
                : "Chưa phê duyệt"}
            </Descriptions.Item>
            <Descriptions.Item label="Lý do">
              {request.note !== null ? request.note : "Không có"}
            </Descriptions.Item>
          </Descriptions>
          <hr />
          <Descriptions title="Thông tin sinh viên">
            <Descriptions.Item label="User name sinh viên">
              {student.userName}
            </Descriptions.Item>
            <Descriptions.Item label="Họ & tên">
              {student.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
          </Descriptions>
          <hr />
          <Descriptions title="Thông tin người gửi">
            <Descriptions.Item label="User name người gửi">
              {sender.userName}
            </Descriptions.Item>
            <Descriptions.Item label="Họ & tên">
              {sender.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{sender.email}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
}
