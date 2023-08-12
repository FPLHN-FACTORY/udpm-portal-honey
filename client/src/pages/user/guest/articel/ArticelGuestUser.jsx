import { Col, Row } from "antd";
import React from "react";
import CardGuestList from "./CardList";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useEffect } from "react";
import { ArticleAPI } from "../../../../apis/user/auth/article/article.api";
import {
  GetArticles,
  SetArticles,
} from "../../../../app/reducers/articles/articles.reducer";

const ArticelGuestUser = () => {
  const dispatch = useAppDispatch();

  const fetchData = () => {
    ArticleAPI.fetchAllArticle().then((response) => {
      dispatch(SetArticles(response.data.data.data));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = useAppSelector(GetArticles);

  return (
    <div>
      <div
        className="m-auto scroll-smooth"
        style={{ paddingTop: "150px", background: "#fff" }}
      >
        <div
          style={{ maxWidth: "1336px" }}
          className="m-auto"
        >
          <Row className="px-20">
            <Col lg={17} md={24} className="mx-4">
              <CardGuestList data={data} />
            </Col>
            <Col
              lg={6}
              md={0}
              style={{ borderLeft: "1px solid rgb(230, 230, 230)" }}
              className="pl-8"
            >
              hihi
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ArticelGuestUser;
