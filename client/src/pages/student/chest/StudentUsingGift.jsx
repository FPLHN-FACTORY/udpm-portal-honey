import React, { useState } from "react";
import { message, Modal, Form, Input, Slider, Select, Col, InputNumber, Row } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { SetGiftArchive } from "../../../app/reducers/archive-gift/gift-archive.reducer";
import { SetArchiveCountGift } from "../../../app/reducers/archive-gift/archive-count-gift.reducer";
import { Option } from "antd/es/mentions";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [dataClass, setDataClass] = useState([]);
  const [dataScore, setDataScore] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
    ArchiveAPI.getListClass().then((response) => {
      setDataClass(response.data)
    })
  };

  const fetchData = () => {
    ArchiveAPI.getGift(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
    ArchiveAPI.detailArchiveGift(archivegift.idGift).then((response) => {
      let quantity = parseInt(response.data.quantity);
      dispatch(SetArchiveCountGift(quantity));
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          archiveGiftId: archivegift.id,
          quantity: soLuong,
        };
        ArchiveAPI.openGift(data)
          .then((result) => {
            if (result.data.success) {
              message.success("Đã gửi yêu cầu lên giảng viên");
              handleCancel();
            }
          })
          .catch((error) => {
            message.error(error.response.data.message);
          })
          .finally(() => {
            fetchData();
          });
      })
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const [soLuong, setSoLuong] = useState(1);


  const onChange = (value) => {
    const classStudent = dataClass.filter(el => el.classId === value)[0];
    form.setFieldValue("maMon", classStudent.subjectName)
    form.setFieldValue("emailGV", classStudent.teacherEmail)

    ArchiveAPI.getScoreClass({ classId: classStudent.classId, subjectId: classStudent.subjectId }).then((response) => {
      setDataScore(response.data);
    })
  };
  const onChangeInput = (newValue) => {
    setSoLuong(newValue);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <div>
      <div onClick={showModal}>Sử dụng</div>
      <Modal
        title="Sử dụng quà tặng"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <Form form={form}
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 18,
            }} >

          <Form.Item
            name="maLop"
            label="Mã lớp học"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã lớp!",
              },
            ]}>
            <Select
              placeholder="Vui lòng nhập mã lớp!"
              showSearch
              optionFilterProp="children"
              onChange={(el) => onChange(el)}
              filterOption={filterOption}
              options={dataClass.map(option => ({
                value: option.classId,
                label: option.className
              }
              ))}
            />
          </Form.Item>
          <Form.Item
            name="maMon"
            label="Mã môn học"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã môn học!",
              },
            ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="emailGV"
            label="Email giảng viên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email giảng viên!",
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="dauDiem"
            label="Đầu điểm lớp học"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã lớp!",
              },
            ]}>
            <Select
              showSearch
              name="dauDiemSelect"
              placeholder="Vui lòng chọn đầu điểm"
              filterOption={filterOption}
              key={"dauDiemSelect"}
            >
              {dataScore.map(option => (
                <Option value={option.id} key={option.id} > { option.name }</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={"Số lượng"}
            name={"number"}
            rules={[
              {
                required: true,
                message: "Vui lòng không được để trống số lượng"
              },
            ]}
          >
            <Row>
              <Col span={14}>
                <Slider
                  value={typeof soLuong === 'number' ? soLuong : 0}
                  onChange={(e) => {
                    setSoLuong(e);
                  }}
                  max={parseInt(archivegift.quantity)}
                  min={1}
                />
              </Col>
              {/* <Col span={4}>
                <InputNumber
                  max={parseInt(archivegift.quantity) + 1}
                  min={1}
                  style={{ margin: '0 0 0 16px' }}
                  value={soLuong}
                  onChange={onChangeInput}
                />
              </Col> */}
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsingGift;
