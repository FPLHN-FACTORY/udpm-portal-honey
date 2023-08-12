import {
  CreditCardOutlined,
  LikeOutlined,
  MoreOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Image,
  Menu,
  Row,
  Space,
} from "antd";
import { TymAPI } from "../../../apis/user/auth/tym/tym.api";
import React, { useState, useEffect, memo } from "react";
import moment from "moment";
import { getImageUrl } from "../../../AppConfig";

const MyFavouriteArticle = memo(() => {
  const groupArticlesByDate = (articles) => {
    const groupedArticles = {};

    if (!Array.isArray(articles)) {
      return groupedArticles;
    }

    articles.forEach((article) => {
      const date = moment(parseInt(article.createdDate)).format("L");

      if (groupedArticles[date]) {
        groupedArticles[date].push(article);
      } else {
        groupedArticles[date] = [article];
      }
    });

    return groupedArticles;
  };

  // Trong thành phần của bạn
  const [favouriteArticles, setFavouriteArticles] = useState([]);
  const [groupedFavouriteArticles, setGroupedFavouriteArticles] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    const fetchFavouriteArticles = async () => {
      try {
        const response = await TymAPI.getAllTymArticle();
        setFavouriteArticles(response.data.data); // Giả sử dữ liệu trả về là response.data
      } catch (error) {
        console.error("Error fetching FavouriteArticles:", error);
      }
    };

    fetchFavouriteArticles();
  }, []);

  useEffect(() => {
    const groupedArticles = groupArticlesByDate(favouriteArticles);
    setGroupedFavouriteArticles(groupedArticles);
  }, [favouriteArticles]);

  const handleDropdownSort = (e) => {
    console.log("Dropdown 1 clicked:", e.key);
  };

  const handleDropdownMore = (e) => {
    console.log("Dropdown 2 clicked:", e.key);
  };

  const sortArticle = (
    <Menu onClick={handleDropdownSort}>
      <Menu.Item key="option1">Option 1</Menu.Item>
      <Menu.Item key="option2">Option 2</Menu.Item>
      <Menu.Item key="option3">Option 3</Menu.Item>
    </Menu>
  );

  const moreOption = (
    <Menu onClick={handleDropdownMore}>
      <Menu.Item key="optionA">
        <CreditCardOutlined className="mr-2" />
        Xem bài viết
      </Menu.Item>
      <Menu.Item key="optionB">
        <LikeOutlined className="mr-2" />
        Bỏ thích
      </Menu.Item>
    </Menu>
  );
  const getDaysAgo = (createdDate) => {
    const date = moment(parseInt(createdDate));
    const daysAgo = date.fromNow(true); // Lấy kết quả là số ngày trôi qua
    return daysAgo;
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleCheckAll = (e) => {
    setSelectAll(e.target.checked);
  };
  return (
    <div>
      <div>
        <h1 className="text-4xl">My favourite articles</h1>
      </div>
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
            icon={<SwapOutlined style={{ fontSize: "16px" }} />}
            style={{ fontSize: "16px" }}
          >
            Sort
          </Button>
        </Dropdown>
      </div>

      <Checkbox
        checked={selectAll}
        onChange={handleCheckAll}
        className="mt-4 text-base"
      >
        Check all
      </Checkbox>
      <Divider />
      <div className="mb-4">
        {Object.entries(groupedFavouriteArticles).map(
          ([createdDate, favouriteArticles]) => (
            <Card key={createdDate} title={createdDate}>
              {favouriteArticles.map((article, index) => (
                <Space key={index} className="flex justify-between mb-3">
                  <div style={{ width: "auto" }}>
                    <Checkbox checked={selectAll} onChange={onChange}>
                      <div className="ml-1">
                        <Row>
                          <Col xl={4}>
                            <Image
                              alt="example"
                              src={getImageUrl(article.id)}
                              style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "5px",
                              }}
                            />
                          </Col>
                          <Col xl={20} className="mt-1 -pl-1">
                            <span className="text-lg">{article.title}</span>
                            <div className="-mt-5">
                              <span className="text-5xl text-slate-900 font-normal mr-1">
                                .
                              </span>
                              <span>{article.userName}</span> <span> --- </span>
                              <span>
                                Đã thích {getDaysAgo(article.createdDate)} trước
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Checkbox>
                  </div>

                  <div>
                    <Dropdown overlay={moreOption} trigger={["click"]}>
                      <MoreOutlined />
                    </Dropdown>
                  </div>
                </Space>
              ))}
            </Card>
          )
        )}
      </div>
    </div>
  );
});

export default MyFavouriteArticle;
