import {
  Button,
  Card,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";

export default function ProjectManager() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
    <section id="project_manager">
      <Card  style={{ borderTop: "5px solid #FFCC00", marginBottom: 30 }}>
        <div className="filter__auction">
          <FontAwesomeIcon
            icon={faFilter}
            size="2px"
            style={{ fontSize: "26px" }}
          />{" "}
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
          <Row gutter={24} style={{ paddingTop: "20px" }}>
            <Select placeholder='Thể loại'  style={{ width: 900, marginRight: "10px" }}>
              <Option value="" >Tất cả</Option>
            </Select>
            <Button
              style={{
                marginRight: "8px",
                backgroundColor: "rgb(55, 137, 220)",
                color: "white",
              }}
            >
              Import excel
            </Button>
          </Row>
        </div>
      </Card>

      <Card>
      <span style={{ fontSize: "18px" }}>
              <b>Danh sách dự án</b>
            </span>
        <div className="mt-5">
          <Table columns={columns} dataSource={data} />
        </div>
        <div className="mt-5 text-center">
          <Pagination
            simple
            //   current={current}
            //   onChange={(value) => {
            //     setCurrent(value);
            //   }}
            //   total={total * 10}
          />
        </div>
      </Card></section>
    </>
  );
}
