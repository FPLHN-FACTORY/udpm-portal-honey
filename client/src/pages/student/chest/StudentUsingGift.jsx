import React, { useState } from "react";
import { message, Modal, Form, Input, Select } from "antd";
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
          quantity: values.number,
          scoreId: values.dauDiem
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
      }).catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onChange = (value) => {
    const classStudent = dataClass.filter(el => el.classId === value)[0];
    form.setFieldValue("maMon", classStudent.subjectName)
    form.setFieldValue("emailGV", classStudent.teacherEmail)

    const data = {
      classId: classStudent.classId,
      subjectId: classStudent.subjectId,

    }

    ArchiveAPI.getScoreClass(data).then((response) => {
      setDataScore(response.data);
    })
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
        width={700}
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
            label="Mã môn học">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="emailGV"
            label="Email giảng viên">
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
              onChange={() => {
                const dauDiemId = form.getFieldValue("dauDiem")
                const el = form.getFieldValue("number")
                if (el) {
                  let dataDauDiem = dataScore.filter(el => dauDiemId === el.id)[0];
                  form.setFieldValue("score", el.target.value*((archivegift.score*archivegift.scoreRatio)/dataDauDiem.scoreRatio))
                }
              }}
            >
              {dataScore.map(option => (
                <Option value={option.id} key={option.id} > { `${option.name} Trọng số ${option.scoreRatio}/100` }</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={"Số lượng quà sử dụng"}
            name={"number"}
            rules={[
              {
                required: true,
                message: "Vui lòng không được để trống số lượng"
              },
              {
                validator: (_, value) => {
                  const regex = /^[0-9]+$/;
                  if (!regex.test(value) || value === 0) {
                    return Promise.reject(
                      new Error("Vui lòng nhập một số nguyên dương")
                    );
                  }
                  if (value <= 0 || value > 100) {
                    return Promise.reject(
                      new Error("Vui lòng nhập một số lớn hơn 0 và nhỏ hơn 100")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input onChange={(el) => {
              const dauDiemId = form.getFieldValue("dauDiem")
              if (dauDiemId) {
                let dataDauDiem = dataScore.filter(el => dauDiemId === el.id)[0];
                form.setFieldValue("score", el.target.value*((archivegift.score*archivegift.scoreRatio)/dataDauDiem.scoreRatio))
              }
            }} type="number"/>
          </Form.Item>
          
          <Form.Item
            label={"Số lượng điểm nhận được"}
            name={"score"}
          >
            <Input disabled/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsingGift;
