/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Button, Pagination, Space, Table, Card, Input, Tooltip } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import ModalThem from "./ModalAdd";
import ModalDetail from "./ModalDetail";
import "./index.css";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [detailCategory, setDetailCategory] = useState();
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    CategoryAPI.fetchAll().then((response) => {
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      dispatch(SetCategory(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = () => {
    CategoryAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
      dispatch(SetCategory(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetCategory);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Loại mật",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phê duyệt",
      dataIndex: "categoryStatus",
      key: "categoryStatus",
      render: (text) => {
        if (text === "0") {
          return <span>Không phê duyệt</span>;
        } else {
          return <span>Phê duyệt</span>;
        }
      },
    },
    {
      title: "Quy đổi",
      dataIndex: "transactionRights",
      key: "transactionRights",
      render: (text) => {
        if (text === "0") {
          return <span>Được giao dịch</span>;
        } else {
          return <span>Không giao dịch</span>;
        }
      },
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
                setDetailCategory(record);
                setShowModal(true);
                console.log(record);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip>

          <ModalDetail category={record} icon={<FormOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      {showModal && (
        <ModalThem
          modalOpen={showModal}
          setModalOpen={setShowModal}
          category={detailCategory}
          SetCategory={setDetailCategory}
        />
      )}

      <Card className="mb-2">
        <h1 className="text-xl">Tìm kiếm thể loại</h1>
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "30px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên hoặc mã..."
            />
          </div>
          <button
            type="button"
            className="search-button1"
            icon={<SearchOutlined />}
            onClick={() => {
              setCurrent(1);
              fetchData();
            }}
            style={{ marginTop: "20px" }}
          >
            Tìm kiếm
          </button>
        </form>
      </Card>

      <Card>
        <div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <Tooltip title="Thêm thể loại">
                  <button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailCategory(null);
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    <PlusOutlined className="mr-1" />
                    Thêm thể loại
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
