import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Pagination,
  Space,
  Table,
  Card,
  Tooltip,
  DatePicker,
  Row,
  Col,
  Select,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import locale from "antd/es/date-picker/locale/vi_VN";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import {
  GetArticles,
  SetArticles,
} from "../../../app/reducers/articles/articles.reducer";
import "./index.css";
import { CensorAPI } from "../../../apis/censor/article/article.api";

export default function DanhSachActicles() {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const { Option } = Select;
  const [sortOrder, setSortOrder] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchFromURL = () => {
    const queryParams = new URLSearchParams(location.search);
    const sortOrder = queryParams.get("sortOrder");
    const startDate = queryParams.get("startDate");
    const endDate = queryParams.get("endDate");
    const page = queryParams.get("page");

    setSortOrder(sortOrder || "");
    setStartDate(startDate || null);
    setEndDate(endDate || null);
    setCurrent(page ? parseInt(page, 10) : 1);
    fetchData();
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const fetchData = () => {
    CensorAPI.fetchAll({
      sortOrder: sortOrder,
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      page: current - 1,
    }).then((response) => {
      dispatch(SetArticles(response.data.data.data));
      setTotal(response.data.data.totalPages);
      setCurrent(response.data.data.currentPage + 1);
    });
    const queryParams = new URLSearchParams(location.search);
    if (sortOrder != "") queryParams.set("sortOrder", sortOrder);
    if (startDate != null) queryParams.set("startDates", formatDate(startDate));
    if (endDate != null) queryParams.set("endDates", formatDate(endDate));
    if (current != null) queryParams.set("page", current);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  useEffect(() => {
    fetchData();
  }, [current, sortOrder]);

  useEffect(() => {
    handleSearchFromURL();
  }, [location.search]);

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
    setCurrent(1);
    fetchData();
  };

  const data = useAppSelector(GetArticles);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "name",
      key: "title",
    },
    {
      title: "Hashtags",
      dataIndex: "hashtags",
      key: "hashtags",
    },
    {
      title: "Created date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) => {
        const date = new Date(createdDate);
        return date.toLocaleDateString();
      },
    },

    {
      title: () => <div>Action</div>,
      key: "action",
      render: (record) => (
        <Space size="small">
          <Tooltip title="Detail">
            <Link to={`/censor/article/${record.id}`}>{<EyeOutlined />}</Link>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Card className="mb-2">
        <Row>
          <Col span={14}>
            <h1>Sort by posting date</h1>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="select-sort-type"
            >
              <Option value="">Choose sort type</Option>
              <Option value="newest">Ascending</Option>
              <Option value="oldest">Decrease</Option>
            </Select>
          </Col>
          <Col span={10}>
            <h1>Search</h1>
            <div className="flex">
              <DatePicker
                value={startDate}
                onChange={(el) => setStartDate(el)}
                locale={locale}
                className="datePicker"
                placeholder="Start date"
              />
              <DatePicker
                value={endDate}
                onChange={(el) => setEndDate(el)}
                locale={locale}
                className="datePicker"
                placeholder="End date"
              />
              <Button
                type="primary"
                className="search-button"
                onClick={fetchData}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Card>
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
