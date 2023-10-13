import { Button, Card, Space, Spin, Table, Tabs, Tooltip } from "antd";
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
import DetailArchiveGift from "./StudentDetailGift";
import {
  GetGiftArchive,
  SetGiftArchive,
} from "../../../app/reducers/archive-gift/gift-archive.reducer";
import {
  GetArchiveChest,
  SetArchiveChest,
} from "../../../app/reducers/archive-gift/archive-chest.reducer";

export default function StArchive() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [archivegift, setArchiveGift] = useState();
  const [showModal, setShowModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState({ page: 0, size: 4, type: 0 });
  const [selectedOption, setSelectedOption] = useState(0);
  const { TabPane } = Tabs;

  useEffect(() => {
    fetchData();
    fetchChest();
  }, [filter]);

  const fetchData = () => {
    console.log(selectedOption);
    try {
      setLoading(true);
      if (selectedOption === 0) {
        ArchiveAPI.getGift(filter).then((response) => {
          dispatch(SetGiftArchive(response.data.data));
          console.log(response.data.data);
          setTotalPage(response.data.totalPages);
          setLoading(false);
        });
      } else {
        ArchiveAPI.getArchive(filter).then((response) => {
          dispatch(SetArchiveGift(response.data.data));
          setTotalPage(response.data.totalPages);
          setLoading(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dataArchive = useAppSelector(GetArchiveGift);
  const dataGift = useAppSelector(GetGiftArchive);

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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
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

  const columnsGift = [
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
          <Tooltip title="Sử dụng">
            <Button
              className="detail-button"
              style={{ padding: "1px 0.7rem" }}
              onClick={() => {
                setShowModal(true);
                setArchiveGift(record);
                fetchData();
              }}
            >
              <EyeOutlined className="icon" />
            </Button>
          </Tooltip>
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
          <ModalArchiveChest chest={record} icon={EyeOutlined} />
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
      dispatch(SetArchiveChest(response.data.data));
    });
  };

  const listChest = useAppSelector(GetArchiveChest);

  return (
    <div className="st_archive">
      <Spin spinning={loading}></Spin>
      {showModal && (
        <DetailArchiveGift
          modalVisible={showModal}
          setModalVisible={setShowModal}
          filter={filter}
          archivegift={archivegift}
        />
      )}
      <Card>
        <Tabs
          className="font-bold select-category"
          onChange={handleOptionChange}
          activeKey={selectedOption.toString()}
        >
          {optionsType().map((option) => (
            <TabPane tab={option.label} key={option.value.toString()}>
              <Table
                columns={
                  selectedOption == "0"
                    ? columnsGift
                    : selectedOption == "3"
                    ? columnsChest
                    : columns
                }
                dataSource={
                  selectedOption == "3"
                    ? listChest
                    : selectedOption == "0"
                    ? dataGift
                    : dataArchive
                }
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
