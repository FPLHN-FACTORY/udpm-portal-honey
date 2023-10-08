import { Card, Space, Spin, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import UsingGift from "./StudentUsingGift";
import { EyeOutlined } from "@ant-design/icons";
import {
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";
import ModalArchiveChest from "./StudentOpenChest";
import { GetChest, SetChest } from "../../../app/reducers/chest/chest.reducer";

export default function StArchive() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState({ page: 0, size: 4, type: 0 });
  const [selectedOption, setSelectedOption] = useState(0);
  const { TabPane } = Tabs;

  useEffect(() => {
    fetchData();
    fetchChest();
  }, [filter]);

  const fetchData = () => {
    try {
      setLoading(false);
      ArchiveAPI.getArchive(filter).then((response) => {
        dispatch(SetArchiveGift(response.data.data));
        setTotalPage(response.data.totalPages);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dataArchive = useAppSelector(GetArchiveGift);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
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
          <UsingGift archivegift={record} filter={filter} />
        </Space>
      ),
    },
  ];
  const columnsChest = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
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
          <ModalArchiveChest
            chest={record}
            icon={EyeOutlined}
            filter={filter}
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
      {
        label: "Rương",
        value: 3,
      },
    ];
  };
  const handleOptionChange = (optionValue) => {
    setSelectedOption(optionValue);
    setFilter({ ...filter, type: optionValue });
  };

  const fetchChest = () => {
    ArchiveAPI.getChest(filter).then((response) => {
      dispatch(SetChest(response.data.data));
    });
  };

  const listChest = useAppSelector(GetChest);

  useEffect(() => {}, [listChest]);

  return (
    <div className="st_archive">
      <Spin spinning={loading}></Spin>
      <Card>
        <Tabs
          className="font-bold select-category"
          onChange={handleOptionChange}
          activeKey={selectedOption.toString()}
        >
          {optionsType().map((option) => (
            <TabPane tab={option.label} key={option.value.toString()}>
              <Table
                columns={selectedOption === "3" ? columnsChest : columns}
                dataSource={selectedOption === "3" ? listChest : dataArchive}
                rowKey="code"
                pagination={true}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
