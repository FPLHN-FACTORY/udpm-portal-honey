import { useState } from "react";
import { Input, Button, Card, Col, Form, Row, Select, Tag } from "antd";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { ConvertionHoneyAPI } from "../../../apis/teacher/convertion-honey/convertion-honey.api";

export default function ConvertionHoney() {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [point, setPoint] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState([]);
  const [gift, setGift] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await ConvertionHoneyAPI.getUserAPiByCode(search);
      const userData = await response.data.data;
      setCode(userData.code || "");
      setEmail(userData.email || "");
      setName(userData.name || "");
      setPoint("Null");
      setCourse("Null");
      setPhonenumber("Null");
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="mb-2">
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "30px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nhập mã sinh viên..."
            />
          </div>
          <button
            type="button"
            className="search-button1"
            icon={<SearchOutlined />}
            onClick={() => handleSearch()}
          >
            Tìm kiếm
          </button>
        </form>
      </Card>
      <Card className="content-card" title="Thông tin sinh viên">
        <Row className="mx-10">
          <Col
            className="py-25"
            span={12}
            style={{ borderRight: "1px solid #F0F0F0" }}
          >
            <Row className="font-semibold">
              <Col span={12}>
                <div>
                  MSSV: <Tag>{code}</Tag>
                </div>
                <div className="m-25">
                  Họ và tên: <Tag>{name}</Tag>
                </div>
                <div>
                  Email: <Tag>{email}</Tag>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  Số điểm: <Tag>{point}</Tag>
                </div>
                <div className="m-25">
                  Khóa: <Tag>{course}</Tag>
                </div>
                <div>
                  Số điện thoại: <Tag>{phoneNumber}</Tag>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="py-25" span={12} style={{ paddingLeft: "25px" }}>
            <Form>
              <Row>
                <Col span={14} className=" font-semibold">
                  <div>
                    Loại điểm:{" "}
                    <Select
                      showSearch
                      placeholder="Category"
                      optionFilterProp="children"
                      style={{ width: "33%", marginLeft: "20px" }}
                      size="small"
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "7px",
                    }}
                  >
                    Loại quà:
                    <Select
                      showSearch
                      placeholder="Gift"
                      optionFilterProp="children"
                      style={{ width: "33%", marginLeft: "20px" }}
                      size="small"
                    />
                  </div>
                </Col>

                <Col span={4} className=" font-semibold">
                  <div>
                    <Tag></Tag> điểm
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <Tag></Tag> điểm
                  </div>
                </Col>
              </Row>

              <div className="text-right">
                <Button
                  htmlType="submit"
                  className="search-button"
                  type="dashed"
                >
                  Send
                  <SendOutlined className="m-0 pl-5" />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}
