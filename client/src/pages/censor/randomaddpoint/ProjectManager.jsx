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
import { AddPointStudentAPI } from "../../../apis/censor/add-point/add-point-student.api";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetCategory, SetCategory } from "../../../app/reducers/category/category.reducer";
import ModalImportExcelLab from "./ModalImportExcelEvent";

export default function ProjectManager() {
  const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState("");
    const [nameFile, setNameFile] = useState("");
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

  const fetchDataCate = () => {
    AddPointStudentAPI.getCategory().then((respose) => {
      dispatch(SetCategory(respose.data.data));
    })
  }

  useEffect(() => {
    fetchDataCate();
  },[])

  const categoryData = useAppSelector(GetCategory);

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
          <Select placeholder='Thể loại'  style={{width: 400, marginRight: "10px" }} value={category} onChange={(value) => setCategory(value)}>
                <Option value="" disabled={true}>Chọn thể loại</Option>
                {categoryData.map((category) => 
                  <Option value={category.id}>{category.name}</Option>
                )}
              </Select>
            <Button
              style={{
                marginRight: "8px",
                backgroundColor: "rgb(55, 137, 220)",
                color: "white",
              }}
              onClick={() => setOpen(true)}
            >
              Import excel
            </Button>
            {open && (
                  <ModalImportExcelLab
                    open={open}
                    setOpen={setOpen}
                    nameFile={nameFile}
                    setNameFile={setNameFile}
                  />
                )}
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
