import React, { useEffect, useState } from "react";
import "./topStudent.css";
import { Avatar, Col, Layout, Row } from "antd";
import huonChuongVang from "../../../assets/images/honor/background/huong-chuong-vang.png";
import huonChuongBac from "../../../assets/images/honor/background/huong-chuong-bac.png";
import huonChuongDong from "../../../assets/images/honor/background/huong-chuong-dong.png";
import logo from "../../../assets/images/logo/logo-udpm-2.png";
import Fireworks from "@fireworks-js/react";
import { StudenHallOfFameAPI } from "../../../apis/student/honor/honor.api";
import { GetHonor, SetHonor } from "../../../app/reducers/honor/honor.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const TopStudent = ({ isClose, isShow }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    StudenHallOfFameAPI.getTop3Student().then((response) => {
      dispatch(SetHonor(response.data.data));
    });
  }, [dispatch]);

  const top3 = useAppSelector(GetHonor);

  const closeTop3 = () => {
    const showTop3 = document.querySelector(".show__top3");
    showTop3.style.transform = `translateY(-${window.innerHeight}px)`;

    const top3 = document.getElementById("top3");
    top3.classList.remove("active");

    const top2 = document.getElementById("top2");
    top2.classList.remove("active");

    const top1 = document.getElementById("top1");
    top1.classList.remove("active");

    const showTop3Element = document.getElementById("show__top3");
    showTop3Element.classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 3000);
  };

  useEffect(() => {
    const showTop3Element = document.getElementById("show__top3");
    showTop3Element.classList.add("active");
    const timeout1 = setTimeout(() => {
      document.getElementById("top3").classList.add("active");
    }, 4000);

    const timeout2 = setTimeout(() => {
      document.getElementById("top2").classList.add("active");
    }, 5000);

    const timeout3 = setTimeout(() => {
      document.getElementById("top1").classList.add("active");
    }, 6000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);
  const [time, setTime] = useState(10);

  // Sử dụng hook useEffect để cập nhật thời gian mỗi giây
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (time > 0) {
  //       setTime(time - 1);
  //     } else {
  //       clearInterval(timer);
  //       closeTop3();
  //     }
  //   }, 1000);

  //   // Hủy bỏ interval khi component bị unmounted
  //   return () => {
  //     clearInterval(timer);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [time]);

  const fireworksOptions = {
    autoresize: true,
    opacity: 0.5,
    acceleration: 1.05,
    friction: 0.97,
    gravity: 1.5,
    particles: 50,
    traceLength: 3,
    traceSpeed: 10,
    explosion: 5,
    intensity: 30,
    flickering: 50,
    lineStyle: "round",
    hue: {
      min: 0,
      max: 360,
    },
    delay: {
      min: 30,
      max: 60,
    },
    rocketsPoint: {
      min: 50,
      max: 50,
    },
    lineWidth: {
      explosion: {
        min: 1,
        max: 3,
      },
      trace: {
        min: 1,
        max: 2,
      },
    },
    brightness: {
      min: 50,
      max: 80,
    },
    decay: {
      min: 0.015,
      max: 0.03,
    },
    mouse: {
      click: false,
      move: false,
      max: 1,
    },
  };

  return (
    <Layout id="show__top3" style={{ backgroundColor: "#222" }}>
      <Layout
        className="z-30 show__top3 fixed top-0 w-full h-full showTop3"
        style={{ backgroundColor: "#222" }}
      >
        <Fireworks
          options={fireworksOptions}
          className="h-screen z-40 fixed w-full"
        />

        <div className="honor z-50">
          <div className="honor__title flex justify-between mb-4 px-10">
            <span>
              <img src={logo} alt="" />
            </span>
            <div>
              <button className="close__honor" onClick={closeTop3}>
                Close {time}s
              </button>
            </div>
          </div>
          <Row className="honor__body row justify-center items-center active">
            <Col span={8} id="top2" className="honor__item honor__item--top3">
              <div className="content">
                <div className="back">
                  <div className="back-content delay--03">
                    <img className="w-100" src={huonChuongBac} alt="" />
                    <div className="back-content__title">
                      <h1>II</h1>
                    </div>
                  </div>
                </div>
                <div className="front">
                  <div className="front-content align-items-start">
                    <div className="front-content__tilte">
                      <h1 className="text-4xl">2</h1>
                      <span>nd</span>
                    </div>
                    <div className="front-content__img">
                      <Avatar
                        className="w-full h-auto"
                        src={top3[1]?.picture}
                        alt=""
                      />
                    </div>
                    <div className="front-content__infor d-flex flex-column">
                      <span>{top3[1]?.name}</span>
                      <span>{top3[1]?.totalHoney} Mật ong</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8} id="top1" className="honor__item honor__item--top2">
              <div className="content">
                <div className="back">
                  <div className="back-content delay--02">
                    <img className="w-100" src={huonChuongVang} alt="" />
                    <div className="back-content__title">
                      <h1>I</h1>
                    </div>
                  </div>
                </div>
                <div className="front">
                  <div className="front-content align-items-start">
                    <div className="front-content__tilte">
                      <h1 className="text-4xl">1</h1>
                      <span>nd</span>
                    </div>
                    <div className="front-content__img">
                      <Avatar
                        className="w-full h-auto"
                        src={top3[0]?.picture}
                        alt=""
                      />
                    </div>
                    <div className="front-content__infor d-flex flex-column">
                      <span>{top3[0]?.name}</span>
                      <span>{top3[0]?.totalHoney} Mật ong</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8} id="top3" className="honor__item honor__item--top3">
              <div className="content">
                <div className="back">
                  <div className="back-content delay--05">
                    <img className="w-100" src={huonChuongDong} alt="" />
                    <div className="back-content__title">
                      <h1>III</h1>
                    </div>
                  </div>
                </div>
                <div className="front">
                  <div className="front-content align-items-start">
                    <div className="front-content__tilte">
                      <h1 className="text-4xl">3</h1>
                      <span>nd</span>
                    </div>
                    <div className="front-content__img">
                      <Avatar
                        className="w-full h-auto"
                        src={top3[2]?.picture}
                        alt=""
                      />
                    </div>
                    <div className="front-content__infor d-flex flex-column">
                      <span>{top3[2]?.name}</span>
                      <span>{top3[2]?.totalHoney} Mật ong</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="flex justify-between absolute w-[100%] h-[10%] mt-[10px] left-0 bottom-0  z-50">
          <div className="camera camera__right" title="Nhấn để chụp ảnh">
            <div className="light__shadow"></div>
          </div>
          <div className="camera camera__left" title="Nhấn để chụp ảnh">
            <div className="light__shadow"></div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};
export default TopStudent;
