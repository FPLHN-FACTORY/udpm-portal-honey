import {
    Button,
    Card,
    Form,
    Input,
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
import { SearchOutlined } from "@ant-design/icons";
  
  export default function EventManager() {
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
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập mã sinh viên",
                },
              ]}
              className="search-input"
              style={{ width: 500, marginRight: 10 }}
            >
              <Input
                size="small"
                placeholder="Nhập mã sinh viên cần tìm"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
              <Select placeholder='Thể loại'  style={{width: 400, marginRight: "10px" }}>
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
                <b>Danh sách sự kiện</b>
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
  