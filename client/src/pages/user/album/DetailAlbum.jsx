import {
  AuditOutlined,
  CalendarOutlined,
  EditOutlined,
  SwapOutlined,
  DeleteOutlined,
  MoreOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Image, Menu, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import anh1 from "../../../assets/images/face-3.jpg";
import "./index.css";
import { useParams } from 'react-router-dom';
import { AlbumAPI } from "../../../apis/user/guest/album/user.album.api";

export default function DetailAlbum() {
  const [articles, setArticles] = useState([]);
  const [album, setAlbum] = useState({});
  const { id } = useParams();
  const [articleId, setArticleId] = useState(null);

  const getAllArticlesByAlbum = () => {
    AlbumAPI.fetchAllArticleByAlbum(id).then((response) => {
      setArticles(response.data.data.data);
    })
  }

  const getAlbumById = () => {
    AlbumAPI.fetchAlbumById(id).then((response) => {
      setAlbum(response.data.data);
    });
  }

  useEffect(() => {
    getAllArticlesByAlbum();
    getAlbumById();
  }, []);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleDropdownSort = (e) => {
    console.log("Dropdown 1 clicked:", e.key);
  };

  const sortArticle = (
    <Menu onClick={handleDropdownSort}>
      <Menu.Item key="option1">Option 1</Menu.Item>
      <Menu.Item key="option2">Option 2</Menu.Item>
      <Menu.Item key="option3">Option 3</Menu.Item>
    </Menu>
  );

  const handleDropdownMore = (e) => {
    setArticleId(e.key);
  };

  const moreOption = (
    <Menu onClick={handleDropdownMore}>
      <Menu.Item key={articleId} onClick={() => deleteArticle()}>
        <DeleteOutlined className="mr-2" />
        Xóa vĩnh viễn
      </Menu.Item>
      <Menu.Item key="optionB">Chi minh toi</Menu.Item>
    </Menu>
  );

  const setIdBaiViet = (id) => {
    setArticleId(id);
  }

  const deleteArticle = () => {
    AlbumAPI.deleteArticleOnAlbum(articleId, id).then(() => {
      getAllArticlesByAlbum();
    });
  }

  return (
    <div id="album">
      <div>
        <Row>
          <Col xs={8} className="mr-6">
            <Card
              className="ablum-filter"
              hoverable
              style={{
                width: "auto",
                overflow: "hidden",
                background: `url(${anh1})`
              }}
            >
              <div style={{}}>
                <Image
                  src={album.userImg}
                  style={{
                    width: "auto",
                    borderRadius: "10px",
                  }}
                ></Image>
                <div className="pt-3 justify-between">
                  <Row>
                    <Col xs={22}>
                      <span className="text-3xl font-black">
                        {album.title}
                      </span>
                    </Col>
                    <Col xs={2} className="pt-2" style={{ fontSize: "20px" }}>
                      <EditOutlined className="float-right" />
                    </Col>
                  </Row>
                  <Row className="pt-3">
                    <span className="text-xl">
                      <AuditOutlined className="mr-2" />
                      {album.userName}
                    </span>
                  </Row>
                  <Row className="pt-3">
                    <span className="text-base">{album.numberOfArticle} bài viết</span>
                    <span className="text-base ml-3">
                      <CalendarOutlined className="mr-1" />
                      {formatDate(album.creatAt)}
                    </span>
                  </Row>
                  <Row className="pt-3">
                    <Col xs={22}>
                      <span className="text-base">
                        Không có thông tin mô tả
                      </span>
                    </Col>
                    <Col xs={2} className="pt-2" style={{ fontSize: "15px" }}>
                      <EditOutlined className="float-right" />
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={15}>
            <div>
              <Dropdown
                overlay={sortArticle}
                trigger={["click"]}
                placement="bottomLeft"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button
                  type="text"
                  icon={<SwapOutlined style={{ fontSize: "16px" }} />}
                  style={{
                    fontSize: "16px",
                    border: "none",
                    boxShadow: "none",
                    marginBottom: "10px",
                  }}
                >
                  Sort
                </Button>
              </Dropdown>
            </div>

            <div>
              {articles.map((a) => (
                <Card className="mb-4">
                  <Row>
                    <Col span={23}>
                      <div className="ml-1">
                        <Row className="justify-between">
                          <Col span={6}>
                            <Image
                              alt="example"
                              src={a.img}
                              style={{
                                width: "320px",
                                height: "100px",
                                borderRadius: "5px",
                              }}
                            />
                          </Col>
                          <Col span={17}>
                            <span className="text-lg font-semibold">
                              {a.title.length > 100 ? `${a.title.substring(0, 100)} ...` : a.title}
                            </span>
                            <Row>
                              <span className="text-lg">{a.name}</span>
                            </Row>
                            <div className="-mt-5">
                              <span className="text-5xl text-slate-900 font-normal mr-1">
                                .
                              </span>
                              <span>{formatDate(a.browseDate)}</span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={1}>
                      <Dropdown overlay={moreOption} onClick={() => setIdBaiViet(a.id)} trigger={["click"]}>
                        <Space className="text-base">
                          <MoreOutlined />
                        </Space>
                      </Dropdown>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

