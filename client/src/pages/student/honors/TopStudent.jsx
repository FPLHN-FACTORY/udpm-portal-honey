import React, { memo, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "antd";

const TopStudent = memo(() => {
  const confettiRef = useRef();
  const navigate = useNavigate();
  const [imageSrcGolden, setImageSrcGolden] = useState(
    "https://img.pikbest.com/origin/09/08/06/02WpIkbEsTDcS.png!sw800"
  );
  const [imageSrcSilver, setImageSrcSilver] = useState(
    "https://png.pngtree.com/png-clipart/20231004/original/pngtree-silver-cupaward-best-picture-image_13190444.png"
  );
  const [imageSrcCopper, setImageSrcCopper] = useState(
    "https://png.pngtree.com/png-clipart/20230621/original/pngtree-golden-trophy-design-vector-png-image_9194654.png"
  );
  const [showTitle, setShowTitle] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [showTitleSilver, setShowTitleSlive] = useState(false);
  const [showInfoSliver, setShowInfoSlive] = useState(false);

  const [showTitleGolden, setShowTitleGolden] = useState(false);
  const [showInfoGolden, setShowInfoGolden] = useState(false);

  const confettiOptions = {
    width: 1100,
    height: 450,
    recycle: false,
  };
  const [countdown, setCountdown] = useState(20);

  const closeTop3 = () => {
    navigate("/student/honor-student");
    console.log("Closing top 3");
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      if (countdown === 0) {
        closeTop3();
      }
      if (countdown === 19) {
        setImageSrcCopper("https://i.pinimg.com/236x/12/37/b3/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg");
      }
      if (countdown === 17) {
        setImageSrcSilver("https://freenice.net/wp-content/uploads/2021/08/Anh-avatar-dep-facebook-zalo-cho-nu.jpg");
      }
      if (countdown === 15) {
        setImageSrcGolden("https://thuthuatnhanh.com/wp-content/uploads/2019/10/avatar-me-than-tuong-390x390.jpg");
      }

      if (countdown === 19) {
        const titleTimeout = setTimeout(() => {
          setShowTitle(true);
        }, 1000);
        const infoTimeout = setTimeout(() => {
          setShowInfo(true);
        }, 1000);

        return () => {
          clearTimeout(titleTimeout);
          clearTimeout(infoTimeout);
        };
      }

      if (countdown === 17) {
        const titleTimeout = setTimeout(() => {
          setShowTitleSlive(true);
        }, 1000);
        const infoTimeout = setTimeout(() => {
          setShowInfoSlive(true);
        }, 1000);

        return () => {
          clearTimeout(titleTimeout);
          clearTimeout(infoTimeout);
        };
      }

      if (countdown === 15) {
        const titleTimeout = setTimeout(() => {
          setShowTitleGolden(true);
        }, 1000);
        const infoTimeout = setTimeout(() => {
          setShowInfoGolden(true);
        }, 1000);

        return () => {
          clearTimeout(titleTimeout);
          clearTimeout(infoTimeout);
        };
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return (
    <section className="top__student">
      <Confetti {...confettiOptions} ref={confettiRef} />
      <div className="absolute flex justify-between mb-4 w-[100%] h-[20%] p-[20px]">
        <div className="top__student__logo">
          <img alt="" src="https://ap.poly.edu.vn/images/logo.png" />
        </div>
        <div>
          <button
            className="close__honor"
            onClick={() => {
              closeTop3();
            }}
          >
            {" "}
            Close {countdown}s
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center absolute w-[75%] h-[70%] mt-[50px] pl-[300px]">
        <Col span={8}>
          <div class="item__top p-[10px]">
            {showTitleSilver && (
              <div class="item__top__tilte flex text-[#fff]">
                <h1>2</h1>
                <span>nd</span>
              </div>
            )}
            <div class="item__top__image pl-[10px]">
              <img
                src={imageSrcSilver}
                alt=""
                className="w-[100px] h-[100px] rounded-[50%]"
              />
            </div>
            {showInfoSliver && (
              <div class="item__top__info text-[#fff] text-center">
                <p className="text-[16px]">Nguyen Van An</p>
                <p className="text-[16px]">PH77777</p>
              </div>
            )}
          </div>
        </Col>
        <Col span={8}>
          <div class="item__top p-[10px]">
            {showTitleGolden && (
              <div class="item__top__tilte flex text-[#fff]">
                <h1>1</h1>
                <span>st</span>
              </div>
            )}
            <div class="item__top__image pl-[10px]">
              <img
                src={imageSrcGolden}
                alt=""
                className="w-[100px] h-[100px] rounded-[50%]"
              />
            </div>
            {showInfoGolden && (
              <div class="item__top__info text-[#fff] text-center">
                <p className="text-[16px]">Nguyen Van An</p>
                <p className="text-[16px]">PH77777</p>
              </div>
            )}
          </div>
        </Col>
        <Col span={8}>
          <div class="item__top p-[10px]">
            {showTitle && (
              <div class="item__top__tilte flex text-[#fff]">
                <h1>3</h1>
                <span>rd</span>
              </div>
            )}
            <div class="item__top__image pl-[10px]">
              <img
                src={imageSrcCopper}
                alt=""
                className="w-[100px] h-[100px] rounded-[50%]"
              />
            </div>
            {showInfo && (
              <div class="item__top__info text-[#fff] text-center">
                <p className="text-[16px]">Nguyen Van An</p>
                <p className="text-[16px]">PH77777</p>
              </div>
            )}
          </div>
        </Col>
      </div>
      <div className="flex justify-between absolute w-[100%] h-[10%] mt-[10px] left-0 bottom-0">
        <div class="camera camera__right" title="Nhấn để chụp ảnh">
          <div class="light__shadow"></div>
        </div>
        <div class="camera camera__left" title="Nhấn để chụp ảnh">
          <div class="light__shadow"></div>
        </div>
      </div>
    </section>
  );
});
export default TopStudent;
