import { Card, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import {
  GetArchive,
  SetArchive,
} from "../../../app/reducers/archive/archive.reducer";

export default function StArchive() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const dispatch = useAppDispatch();
  let [userLogin, setUserLogin] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState({ page: 0, size: 4 });

  useEffect(() => {
    TransactionApi.getUserLogin().then((user) => {
      setUserLogin(user.data);
    });
  }, []);

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    setLoading(true);
    const fetchData = async (filter) => {
      try {
        const response = await ArchiveAPI.getArchive(filter);
        const listArchive = await Promise.all(
          response.data.data.map(async (data) => {
            try {
              const user = await TransactionApi.getStudent(data.studentId);
              return {
                ...data,
                nameStudent: user.data.data.name,
                userName: user.data.data.userName,
              };
            } catch (error) {
              console.error(error);
              return data;
            }
          })
        );
        dispatch(SetArchive(listArchive));
        setList(listArchive);
        console.log(response.data);
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
      title: "Mã vật phẩm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên vật phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "toDate",
      key: "toDate",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
  ];
  return (
    <div className="st_archive">
      <Spin spinning={loading}></Spin>
      <Card>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="code"
          pagination={true}
        />
      </Card>
    </div>
  );
}
