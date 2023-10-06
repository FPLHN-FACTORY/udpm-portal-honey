import { Card, Segmented, Space, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
// import {
//   GetArchive,
//   SetArchive,
// } from "../../../app/reducers/archive/archive.reducer";
import UsingGift from "./StudentUsingGift";
import { RocketOutlined } from "@ant-design/icons";
import {
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";

export default function StArchive() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const dispatch = useAppDispatch();
  // let [userLogin, setUserLogin] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState({ page: 0, size: 4, type: 0 });
  const [selectedOption, setSelectedOption] = useState(0);

  // useEffect(() => {
  //   TransactionApi.getUserLogin().then((user) => {
  //     setUserLogin(user.data);
  //   });
  // }, []);

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const fetchData = (filter) => {
    setLoading(true);
    const fetchData = async (filter) => {
      try {
        const response = await ArchiveAPI.getArchive(filter);
        const listArchive = await Promise.all(
          response.data.data.map(async (data) => {
            // try {
            //   const user = await TransactionApi.getStudent(data.studentId);
            //   return {
            //     ...data,
            //     nameStudent: user.data.data.name,
            //     userName: user.data.data.userName,
            //   };
            // } catch (error) {
            //   console.error(error);
            // }
            return data;
          })
        );
        dispatch(SetArchiveGift(listArchive));
        // console.log(filter);
        setList(listArchive);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData(filter);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <UsingGift
            archivegift={record}
            filter={filter}
            icon={<RocketOutlined />}
          />
        </Space>
      ),
    },
  ];

  const optionsType = () => {
    return [
      {
        label: "Quà",
        value: 0,
      },
      {
        label: "Vật phẩm",
        value: 1,
      },
      {
        label: "Dụng cụ",
        value: 2,
      },
    ];
  };

  const handleOptionChange = (optionValue) => {
    setSelectedOption(optionValue);
    setFilter({ ...filter, type: optionValue });
  };

  const data = useAppSelector(GetArchiveGift);

  return (
    <div className="st_archive">
      <Spin spinning={loading}></Spin>
      <Card
        extra={
          <Segmented
            className="font-bold select-category"
            onChange={handleOptionChange}
            value={selectedOption}
            options={optionsType().map((option) => ({
              label: option.label,
              value: option.value,
            }))}
          />
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey="code"
          pagination={true}
        />
      </Card>
    </div>
  );
}
