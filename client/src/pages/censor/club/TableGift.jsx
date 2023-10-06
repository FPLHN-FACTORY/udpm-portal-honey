import React, { useEffect, useState } from "react";
import { Table, Row, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ClubAPI } from "../../../apis/censor/club/club.api";
import { GetGift, SetGift } from "../../../app/reducers/gift/gift.reducer";
import { useParams } from "react-router-dom";

const TableGift = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ClubAPI.fetchGitInClub({
      search: search.trim(),
      idClub: id,
      page: current - 1,
    }).then((response) => {
      dispatch(SetGift(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetGift);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã vật phẩm",
      dataIndex: "code",
      key: "code",
      width: 200,
    },
    {
      title: "Tên vật phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  return (
    <>
      <Row span={12}>
        <h1 style={{ fontSize: "18px" }}> Vật phẩm trong CLB</h1>
      </Row>
      <div className="mt-5 mb-2">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
      </div>
      <div className="text-center">
        <Pagination
          simple
          current={current}
          onChange={(value) => {
            setCurrent(value);
          }}
          total={total * 10}
        />
      </div>
    </>
  );
};

export default TableGift;
