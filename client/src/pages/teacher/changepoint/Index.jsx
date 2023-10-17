import { SearchOutlined, SyncOutlined } from "@ant-design/icons";

import { Button, Card, Input, Pagination, Space, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";

const Index = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      stt: i,
      code: `CP${i}`,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
      silverpoint: ` ${i}`,
      goldenpoint: ` ${i}`,
      diamondpoint: ` ${i}`,
    });
  }
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
      title: "Silver Point",
      dataIndex: "silverpoint",
      key: "name",
    },
    {
      title: "Golden Point",
      dataIndex: "goldenpoint",
      key: "name",
    },
    {
      title: "Diamond Point",
      dataIndex: "diamondpoint",
      key: "name",
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Đổi điểm">
            <Button className="update-button">
              <Link
              // to={`/censor/registration-period/${record.id}`}
              // onClick={() => handleUpdateClick(record)}
              >
                <SyncOutlined className="icon" />
              </Link>
            </Button>
          </Tooltip>

          {/* <ModalDetail category={record} icon={<FormOutlined />} /> */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Card className="mb-2">
        <h1>Search Category Articles</h1>
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "30px" }}
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or code"
            />
          </div>
          <button
            type="button"
            className="search-button"
            icon={<SearchOutlined />}
            onClick={() => {
              //   setCurrent(1);
              //   fetchData();
            }}
          >
            Search
          </button>
        </form>
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
            // current={current}
            // onChange={(value) => {
            //   setCurrent(value);
            // }}
            // total={total * 10}
          />
        </div>
      </Card>
    </div>
  );
};

export default Index;
