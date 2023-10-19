/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Button, Pagination, Space, Table, Card, Input, Tooltip } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { SemesterAPI } from "../../../apis/censor/semester/semester.api";
import {
  GetSemester,
  SetSemester,
} from "../../../app/reducers/semester/semester.reducer";
import ModalAdd from "./ModalAdd";
import ModalDetail from "./ModalDetail";
import DeleteConfirm from "./delete";
import "./index.css";

export default function Semester() {
  const [showModal, setShowModal] = useState(false);
  const [detailSemester, setDetailSemester] = useState();
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    SemesterAPI.fetchAll().then((response) => {
      dispatch(SetSemester(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = () => {
    SemesterAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
      dispatch(SetSemester(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetSemester);

  const convertToReadableDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
    return "";
  };

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
      title: "Tên kỳ học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "toDate",
      key: "toDate",
      render: (text) => {
        const readableDate = convertToReadableDate(text);
        return readableDate;
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text) => {
        const readableDate = convertToReadableDate(text);
        return readableDate;
      },
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Cập nhật">
            <Button
              className="update-button"
              onClick={() => {
                setDetailSemester(record);
                setShowModal(true);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip>
          <ModalDetail semester={record} icon={<FormOutlined />} />
          <DeleteConfirm
            semester={record}
            id={record.id}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-semeter">
      {showModal && (
        <ModalAdd
          modalOpen={showModal}
          setModalOpen={setShowModal}
          semester={detailSemester}
          SetSemester={setDetailSemester}
        />
      )}

      <Card className="mb-2">
        <h1 className="text-xl">Tìm kiếm kỳ học</h1>
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
                <Tooltip title="Thêm học kỳ">
                  <button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailSemester(null);
                    }}
                  >
                    <PlusOutlined className="mr-1" />
                    Thêm kỳ học
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
        <div className="mt-5 text-center" style={{ marginTop: "20px" }}>
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
    </div>
  );
}
