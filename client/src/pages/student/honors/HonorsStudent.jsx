import { Layout, Row, Avatar, Pagination, Tooltip, Col } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import anh1 from "../../../assets/images/honor/background/background1.jpg";
import anh2 from "../../../assets/images/honor/background/background2.jpg";
import anh3 from "../../../assets/images/honor/background/background3.png";
import anh4 from "../../../assets/images/honor/background/background4.png";
import TopStudent from "./TopStudent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  GetPStudent,
  SetPStudent,
} from "../../../app/reducers/honor/pStudent.reducer";
import { StudenHallOfFameAPI } from "../../../apis/student/honor/honor.api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const HonorsStudent = () => {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    StudenHallOfFameAPI.getPageStudent({}).then((response) => {
      dispatch(SetPStudent(response.data.data.content));
      setTotal(response.data.data.totalPages);
    });
  }, [dispatch]);

  const pStudent = useAppSelector(GetPStudent);

  // Danh sách các hình ảnh nền
  const backgroundImages = [
    `url(${anh1})`,
    `url(${anh2})`,
    `url(${anh3})`,
    `url(${anh4})`,
  ];

  const [randomBackground, setRandomBackground] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const randomBg = backgroundImages[randomIndex];

    setRandomBackground(randomBg);
    showTop3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isShow, setIsShow] = useState(true);

  const closeTop3 = () => {
    setIsShow(false);
  };

  const showTop3 = () => {
    setIsShow(true);
  };

  const renderPlayerRows = () => {
    return pStudent.map((student, index) => (
      <Link
        to={`/student/hall-of-fame/${student.id}`}
        key={index}
        className="live-leaderboard-player-row"
      >
        <div className="col-player-rank-header">
          <span className="col-player-text">{index + 1}</span>
          <div className="sub-avatar-fire avatar-fire">
            <Avatar
              className="col-player-avatar"
              alt="avatar"
              size={50}
              src={student.picture}
            />
          </div>
        </div>
        <div className="col-player-name-header">
          <span className="col-player-text">{student.name}</span>
        </div>
        <div className="col-player-name-header">
          <span className="col-player-text">{student.username}</span>
        </div>
        <div className="col-player-name-header">
          <span className="col-player-text">{student.rank}</span>
        </div>
        <div className="col-player-points-header">
          <Tooltip title={renderTooltipContent(student.lstCategories)}>
            <span className="col-player-text">{student.numberTotalHoney}</span>
          </Tooltip>
        </div>
      </Link>
    ));
  };
  const renderTooltipContent = (lstCategories) => (
    <div>
      {lstCategories.map((category, index) => (
        <div key={index}>
          <span>
            {"Mật ong: "} {category.nameCategory} {" - Số lượng: "}
          </span>
          <span>{category.numberHoney}</span>
        </div>
      ))}
    </div>
  );
  return (
    <>
      {isShow && (
        <TopStudent isClose={closeTop3} isShow={showTop3}></TopStudent>
      )}
      <Layout
        className="honor__student p-[20px] bg-inherit"
        style={{ backgroundImage: randomBackground }}
      >
        <Header className="mb-[40px] bg-inherit">
          <h2
            className={`text-center hover:text-[##ffac25] honor__title `}
            onClick={() => {
              showTop3();
            }}
          >
            VINH DANH SINH VIÊN
            {/* <div className="honor__title">
            <span><img src="../../assets/img/logo.png" alt="" /></span>
            <div>
              <button className="close__honor" onClick={() => {window.history.back();}}>
                Close
              </button>
            </div>
          </div> */}
          </h2>
        </Header>
        <Content className="horor__table pl-[100px] pr-[100px] min-h-screen">
          <Row className="w-full">
            <div className="live-leaderboard w-full">
              <div className="live-leaderboard-table">
                <div className="live-leaderboard-table-header">
                  <div className="col-player-rank-header">STT</div>
                  <div className="col-player-name-header">Tên sinh viên</div>
                  <div className="col-player-name-header">Mã sinh viên</div>
                  <div className="col-player-name-header">Thứ hạng</div>
                  <div className="col-player-points-header">Điểm</div>
                </div>
                <div>
                  <div>{renderPlayerRows()}</div>
                </div>
              </div>
            </div>
          </Row>
          <div className="pagination__ui">
            {/* <Row>
              <Col span={10}>
                <button className="button button--left">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Previous page
                </button>
              </Col>
              <Col
                span={4}
                className="d-flex align-items-center justify-content-center"
              >
                <h3 className="text-center rank__tilte text-white">1/100</h3>
              </Col>
              <Col span={10}>
                <button className="button button--right">
                  Next page
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </Col>
            </Row> */}
            <div className="mt-5 text-center">
              <Pagination
                simple
                current={current}
                onChange={(value) => {
                  setCurrent(value);
                }}
                total={total * 10}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default HonorsStudent;
