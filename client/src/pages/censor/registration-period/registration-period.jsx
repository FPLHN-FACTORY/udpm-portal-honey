import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Button,
  Pagination,
  Space,
  Table,
  Card,
  Input,
  Tooltip,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CensorRegistrationPeriodAPI } from "../../../apis/censor/registration-period/registration-period.api";
import {
  GetRegistrationPeriod,
  SetRegistrationPeriod,
} from "../../../app/reducers/registration-period/registration-period.reducer";
import ModalThem from "./ModalAdd";
import ModalDetail from "./ModalDetail";
import moment from "moment";
import { Link } from "react-router-dom";
import "./index.css";

export default function RegistrationPeriod() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [detailRegistrationPeriod, setDetailRegistrationPeriod] = useState();
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    CensorRegistrationPeriodAPI.fetchAll().then((response) => {
      dispatch(SetRegistrationPeriod(response.data.data.data));
      setTotal(response.data.data.totalPages);
      setCheck(true);
    });
  }, [dispatch]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const fetchData = () => {
    CensorRegistrationPeriodAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
      dispatch(SetRegistrationPeriod(response.data.data.data));
      setTotal(response.data.data.totalPages);
      setCheck(true);
    });
  };
  const data = useAppSelector(GetRegistrationPeriod);
  let processedData = [];
  if (check) {
    processedData = data.map((item) => {
      const fromDateFormatted = moment(item.fromDate).format("DD/MM/YYYY");
      const toDateFormatted = moment(item.toDate).format("DD/MM/YYYY");
      return {
        ...item,
        date: `${fromDateFormatted} - ${toDateFormatted}`,
      };
    });
  }

  // eslint-disable-next-line no-sparse-arrays
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Effective Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Number article",
      dataIndex: "numberArticles",
      key: "numberArticle",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (parseInt(status) === 0 ? "Active" : "Inactive"),
    },
    ,
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Update">
            <Button
              className="update-button"
              onClick={() => handleUpdateClick(record)}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip>
          <Button className="update-button">
            <Link
              to={`/censor/registration-period/${record.id}`}
              onClick={() => handleUpdateClick(record)}
            >
              <FormOutlined className="icon" />
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
  const handleUpdateClick = (record) => {
    setDetailRegistrationPeriod(record);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <>
      {showModal && (
        <ModalThem
          modalOpen={showModal}
          setModalOpen={setShowModal}
          width={1200}
        />
      )}
      <Card className="mb-2">
        <h1>Search Registration Period</h1>
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "30px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or code"
            />
          </div>
          <button
            className="search-button"
            icon={<SearchOutlined />}
            onClick={() => {
              setCurrent(1);
              fetchData();
            }}
          >
            Search
          </button>
        </form>
      </Card>

      <Card>
        <div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <Tooltip title="Create Registration Period">
                  <button
                    className="add-button"
                    onClick={() => {
                      setShowModal(true);
                      setDetailRegistrationPeriod(null);
                    }}
                  >
                    <PlusOutlined className="mr-1" />
                    Create Registration Period
                  </button>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Table
            columns={columns}
            dataSource={processedData}
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
      <Modal
        visible={showUpdateModal}
        onCancel={handleCloseUpdateModal}
        footer={null}
      >
        {detailRegistrationPeriod && (
          <ModalDetail
            modalOpen={showUpdateModal}
            setModalOpen={setShowUpdateModal}
            category={detailRegistrationPeriod}
          />
        )}
      </Modal>
    </>
  );
}
