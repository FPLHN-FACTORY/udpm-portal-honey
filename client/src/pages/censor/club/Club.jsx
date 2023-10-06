import { Card, Input, Pagination, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ClubAPI } from "../../../apis/censor/club/club.api";

import {
  EditOutlined,
  FormOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ModalAddClub from "./ModalAddClub";
import ModalDelete from "./DeleteClub";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetClub, SetClub } from "../../../app/reducers/club/club.reducer";
import { Link } from "react-router-dom";

export default function IndexClub() {
  const [showModal, setShowModal] = useState(false);
  const [detailClub, setDetailClub] = useState();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ClubAPI.fetchAll({
      search: search.trim(),
      page: current - 1,
    }).then((response) => {
      dispatch(SetClub(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetClub);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên CLB",
      dataIndex: "name",
      key: "name",
    },
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Cập nhập">
            <Button
              className="update-button"
              onClick={() => {
                setDetailClub(record);
                setShowModal(true);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Chi tiết">
            <Link to={`/censor/club/${record.id}`}>
              <Button className="detail-button">
                <FormOutlined className="icon" />
              </Button>
            </Link>
          </Tooltip>
          <ModalDelete club={record} icon={<FormOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      {showModal && (
        <ModalAddClub
          modalOpen={showModal}
          setModalOpen={setShowModal}
          club={detailClub}
          setclub={setDetailClub}
        />
      )}
      <Card className="mb-2">
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "10px", width: "40%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên hoặc mã"
            />
            <button
              type="button"
              className="search-button1"
              icon={<SearchOutlined />}
              onClick={() => {
                setCurrent(1);
                fetchData();
              }}
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <Tooltip title="Thêm quà">
                  <button
                    className="add-button1 mb-2"
                    onClick={() => {
                      setShowModal(true);
                      setDetailClub(null);
                    }}
                  >
                    <PlusOutlined className="mr-1" />
                    Thêm CLB
                  </button>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={false}
          />
        </div>
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
      </Card>
    </>
  );
}