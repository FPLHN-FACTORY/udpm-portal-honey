import { Tabs, Table } from "antd";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const HonorsStudent = memo(() => {
  const navigate = useNavigate();

  const hanlderClick = () => {
    navigate("/student/top-student");
  };
  const data = [
    {
      stt: 1,
      image:
        "https://freenice.net/wp-content/uploads/2021/08/Anh-avatar-dep-facebook-zalo-cho-nu.jpg",
      name: "An",
      code: "ph12345",
      rank: 1,
      point: 1100,
    },
    {
      stt: 2,
      image:
        "https://freenice.net/wp-content/uploads/2021/08/Anh-avatar-dep-facebook-zalo-cho-nu.jpg",
      name: "An",
      code: "ph12345",
      rank: 2,
      point: 1100,
    },
    {
      stt: 3,
      image:
        "https://freenice.net/wp-content/uploads/2021/08/Anh-avatar-dep-facebook-zalo-cho-nu.jpg",
      name: "An",
      code: "ph12345",
      rank: 3,
      point: 1100,
    },
    {
      stt: 4,
      image:
        "https://thuthuatnhanh.com/wp-content/uploads/2019/10/avatar-me-than-tuong-390x390.jpg",
      name: "An",
      code: "ph12345",
      rank: 4,
      point: 1100,
    },
    {
      stt: 5,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      name: "An",
      code: "ph12345",
      rank: 5,
      point: 1100,
    },
    {
      stt: 6,
      image:
        "https://thuthuatnhanh.com/wp-content/uploads/2019/10/avatar-me-than-tuong-390x390.jpg",
      name: "An",
      code: "ph12345",
      rank: 6,
      point: 1100,
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      className: "text-center",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      className: "text-center",
      render: (text, record) => (
        <div
          className={`
        ${[1, 2, 3].includes(record.rank) ? "avarta__fire" : ""} `}
        >
          <img
            src={record.image}
            alt={record.name}
            className={`transition ease-in-out delay-150 w-[40px] h-[40px] rounded-[50%] border-solid border-2 border-[#ffffff3d] hover:border-dashed hover:border-[#ffffff66] hover:border-2 hover:scale-[1.1]
          ${
            [1, 2, 3].includes(record.rank)
              ? "absolute top-[25%] left-[8px]"
              : ""
          } `}
          />
        </div>
      ),
    },
    {
      title: "Tên SV",
      dataIndex: "name",
      key: "name",
      className: "text-center",
    },
    {
      title: "Mã SV",
      dataIndex: "code",
      key: "code",
      className: "text-center",
    },
    {
      title: "Hạng",
      dataIndex: "rank",
      key: "rank",
      className: "text-center",
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
      className: "text-center",
    },
  ];

  return (
    <section className="honor__student p-[20px]">
      <div className="text-center mb-[40px]">
        <h2
          className={`hover:text-[##ffac25] honor__title `}
          onClick={() => {
            hanlderClick();
          }}
        >
          Vinh Danh Sinh Viên
        </h2>
      </div>
      <div className="horor__table pl-[100px] pr-[100px]">
        <Table dataSource={data} columns={columns} />;
      </div>
    </section>
  );
});

export default HonorsStudent;
