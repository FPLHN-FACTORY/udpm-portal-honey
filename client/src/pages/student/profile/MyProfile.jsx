import { Avatar, Button, Card, Col, Row, Select, Tabs } from "antd";
import React, { memo } from "react";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import coinGold from "../../../../src/assets/images/dollar.png";
import coinCopper from "../../../../src/assets/images/copper.png";
import coinSliver from "../../../../src/assets/images/sliver.png";
import hang1 from "../../../../src/assets/images/gold-medal.png";
import hang2 from "../../../../src/assets/images/silver-medal.png";
import hang3 from "../../../../src/assets/images/bronze-medal.png";
import hang4 from "../../../../src/assets/images/medal.png";

const rankingData = [
  { img: hang1, rank: 1, title: "Bạn đạt hạng 1" },
  { img: hang2, rank: 2, title: "Bạn đạt hạng 2" },
  { img: hang3, rank: 3, title: "Bạn đạt hạng 3" },
  { img: hang4, rank: 4, title: "Bạn đạt hạng 4" },
  { img: hang4, rank: 5, title: "Bạn đạt hạng 5" },
];
const items = [
  {
    key: "1",
    label: "Thống kê",
    children: (
      <div>
        {/* ///THỐNG KÊ */}
        <div>
          <h1 style={{ fontSize: 30 }}>Thống kê</h1>
          <div>
            <Row gutter={16}>
              {[
                { name: "Vàng", points: 10, img: coinGold },
                { name: "Đồng", points: 70, img: coinCopper },
                { name: "Bạc", points: 66, img: coinSliver },
                { name: "Kim cương", points: 33, img: coinSliver },
              ].map((coin, index) => (
                <Col span={12} key={index} style={{ marginBottom: 20 }}>
                  <Card style={{ boxShadow: "none" }}>
                    <Row>
                      <Col span={4}>
                        <img alt="" src={coin.img}></img>
                      </Col>
                      <Col span={19} style={{ marginLeft: 15, marginTop: -15 }}>
                        <p style={{ fontSize: 20, fontWeight: 700 }}>
                          {coin.name}
                        </p>
                        <p
                          style={{
                            marginTop: -15,
                            fontWeight: 450,
                            fontSize: 15,
                          }}
                        >
                          {coin.points} điểm
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <br />
        <br />
        {/* ///THÀNH TÍCH */}
        <div>
          <Row style={{ justifyContent: "space-between" }}>
            <Col>
              {" "}
              <h1 style={{ fontSize: 30 }}>Thành tích</h1>
            </Col>
            <Col style={{ paddingTop: 50 }}>
              <Select
                defaultValue="time"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "time",
                    label: "Thời gian",
                  },
                  {
                    value: "new",
                    label: "Gần nhất",
                  },
                  {
                    value: "old",
                    label: "Cũ nhất",
                  },
                ]}
              />
            </Col>
          </Row>

          <div>
            {rankingData.map((data, index) => (
              <Card type="inner" key={index}>
                <Row>
                  <Col span={4}>
                    <img alt="" src={data.img} style={{ width: 100 }} />
                  </Col>
                  <Col span={15} style={{ marginLeft: 15 }}>
                    <p style={{ fontSize: 20, fontWeight: 700 }}>Summer 2023</p>
                    <p style={{ marginTop: -15 }}>{data.title}</p>
                  </Col>
                  <Col span={4}>
                    <p style={{ fontSize: 30, fontFamily: "cursive" }}>
                      {data.rank} / 2000
                    </p>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: "Lịch sử giao dịch",
    children: "Content of Tab Pane 2",
  },
];
const MyProfile = memo(() => {
  return (
    <div>
      <Card>
        {/* ///Header */}
        <div>
          <Row>
            <Col span={18} xs={24} sm={24} md={20}>
              <p style={{ fontSize: 40, marginTop: -5 }}>
                Nguyễn Văn A - AnhDTN
              </p>
              <p style={{ fontSize: 20, marginTop: -30 }}>Kì học : 7</p>
            </Col>
            <Col span={6} xs={24} sm={24} md={4}>
              <Avatar
                size={128}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#87d068",
                }}
              />

              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                style={{
                  height: 33,
                  position: "absolute",
                  marginLeft: -30,
                  marginTop: 15,
                }}
              />
            </Col>
          </Row>
        </div>
        <br />
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
});

export default MyProfile;
