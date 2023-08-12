import {
  Button,
  Pagination,
  Table,
  Card,
  Input,
  Tooltip,
  message,
  Select,
} from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DownloadArticleAPI } from "../../../apis/censor/download/download.api";

export default function DownloadArticle() {
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [lstUser, setLstUser] = useState("");
  const [lstReg, setLstReg] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSelectedRowKeys, setNewSelectedRowKeys] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);
  useEffect(() => {
    DownloadArticleAPI.fetchAllRegistration().then((response) => {
      setLstReg(response.data.data);
    });
    DownloadArticleAPI.fetchAll({
      idReg: selectedReg,
    }).then((response) => {
      setLstUser(response.data.data.data);
      setTotal(response.data.data.totalPages);
    });
  }, [selectedReg]);
  useEffect(() => {
    fetchData();
  }, [current]);
  console.log(lstUser);
  console.log(lstReg);
  const fetchData = () => {
    DownloadArticleAPI.fetchAll({
      search: search,
      idReg: selectedReg,
      page: current - 1,
    }).then((response) => {
      setLstUser(response.data.data.data);
      setTotal(response.data.data.totalPages);
    });
  };
  const handleSelectChange = (value) => {
    setSelectedReg(value);
  };
  console.log(selectedReg);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 300);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setNewSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleDownloadAll = () => {
    if (newSelectedRowKeys.length === 0) {
      message.error("Error, no users are selected!!!");
    } else {
      DownloadArticleAPI.export(newSelectedRowKeys).then((res) => {
        setSelectedRowKeys([]);
        message.success("Articles download successful");
      });
    }
  };
  return (
    <>
      <Card className="mb-2">
        <h1>Search Users</h1>
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
            onClick={(e) => {
              e.preventDefault(); // Prevent the default form submission
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
          <div className="flex flex-row justify-end">
            <div className="mr-10">
              <Button
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
              >
                Reload
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} users` : ""}
              </span>
            </div>
            <div className="mr-10">
              <Select
                size="large"
                showSearch
                placeholder="Select a registration priod"
                optionFilterProp="children"
                onChange={handleSelectChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={selectedReg} // Để hiển thị giá trị đã chọn
                options={
                  lstReg.length > 0
                    ? lstReg.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))
                    : []
                }
              />
            </div>
            <div>
              <span>
                <Tooltip title="Download All Article">
                  <button className="add-button" onClick={handleDownloadAll}>
                    <DownloadOutlined className="mr-1" />
                    Download All Article
                  </button>
                </Tooltip>
              </span>
            </div>
          </div>

          <div className="mt-5">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={lstUser}
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
        </div>
      </Card>
    </>
  );
}
