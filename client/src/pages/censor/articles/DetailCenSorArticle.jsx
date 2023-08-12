import React from "react";
import anh1 from "../../../assets/images/face-1.jpg";
import {
  Avatar,
  Input,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Typography,
  Select,
  Tooltip,
} from "antd";
import { MailOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import moment from "moment";
import JoditEditor from "jodit-react";
import { CensorAPI } from "../../../apis/censor/article/article.api";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import ModalThem from "../category/ModalAdd";

const DetaiConsorArticle = () => {
  const navigate = useNavigate();
  const [detailArticle, setDetailArticle] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [approvalText, setApprovalText] = useState("");
  const [refuseText, setRefuseText] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detailCategory, setDetailCategory] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        const response1 = await CategoryAPI.fetchAllCategory();
        setListCategory(response1.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchListCategory();
  }, []);
  useEffect(() => {
    const fetchDetailArticles = async () => {
      try {
        const response = await CensorAPI.detail(id);
        setDetailArticle(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchDetailArticles();
  }, []);

  const onChangeTextApproval = (e) => {
    setApprovalText(e.target.value);
  };

  const onChangeTextRefuse = (e) => {
    setRefuseText(e.target.value);
  };

  const onChangeSelect = (value) => {
    setSelectedCategory(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleApproval = () => {
    const dataApproval = {
      id: id,
      categoryId: selectedCategory,
      feedback: approvalText,
    };
    try {
      const response2 = CensorAPI.approveArticle(dataApproval);
      setModal1Open(false);
      navigate("/censor/article");
    } catch (error) {
      console.error("Error approval articles:", error);
    }
  };
  const handleRefuse = () => {
    const dataRefuse = {
      id: id,
      feedback: refuseText,
    };
    try {
      const response2 = CensorAPI.refuseArticle(dataRefuse);
      setModal2Open(false);
      navigate("/censor/article");
    } catch (error) {
      console.error("Error fefuse articles:", error);
    }
  };

  const handleSaveCategory = (newCategory) => {
    setListCategory([...listCategory, newCategory]);
  };
  return (
    <div className="justify-items-center">
      {/* open model */}
      <Button type="primary" onClick={() => setModal1Open(true)}>
        Phê duyệt ngay
      </Button>
      <Modal
        title="Approval article"
        style={{
          top: 20,
        }}
        open={modal1Open}
        onOk={handleApproval}
        onCancel={() => setModal1Open(false)}
      >
        {showModal && (
          <ModalThem
            modalOpen={showModal}
            setModalOpen={setShowModal}
            category={detailCategory}
            SetCategory={setDetailCategory}
            onSave={handleSaveCategory}
          />
        )}

        {/* select category */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            showSearch
            size="large"
            placeholder="Chọn thể loại"
            optionFilterProp="children"
            onChange={onChangeSelect}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={listCategory.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
          <div style={{ marginLeft: "5px" }}>
            <div className="flex flex-row-reverse">
              <div>
                <span>
                  <Tooltip title="Add Category">
                    <button
                      className="add-button"
                      onClick={() => {
                        setShowModal(true);
                        setDetailCategory(null);
                      }}
                    >
                      <PlusOutlined className="mr-1" />
                    </button>
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* input text phê duyệt */}
        <Input
          showCount
          maxLength={225}
          placeholder="Enter nhận xét..."
          onChange={onChangeTextApproval}
          style={{ marginTop: "5px" }}
        />
      </Modal>
      <Button type="default" onClick={() => setModal2Open(true)}>
        Từ chối ngay
      </Button>
      <Modal
        title="Refuse Article"
        style={{
          top: 20,
        }}
        open={modal2Open}
        onOk={handleRefuse}
        onCancel={() => setModal2Open(false)}
      >
        <Input
          showCount
          maxLength={225}
          placeholder="Enter nhận xét..."
          onChange={onChangeTextRefuse}
        />
      </Modal>
      {/* detail bài viết */}
      <Row>
        <Col span={24}>
          <h1 className="text-5xl text-slate-900 font-bold not-italic mb-8 ">
            {detailArticle.title}
          </h1>
          <div className="flex">
            <Avatar src={anh1} style={{ width: "48px", height: "48px" }} />

            <div className="ml-3 mt-1">
              <div className="flex">
                <Typography variant="subtitle1">
                  {detailArticle.name}
                </Typography>
                <span className="text-3xl text-slate-900 font-normal ml-1 -mt-4 ">
                  .
                </span>

                <span className="ml-1 text-green-900">
                  <a href="">Follow</a>
                </span>
              </div>
              <span>
                {moment(detailArticle.createdDate).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <div>
            <JoditEditor
              value={detailArticle.content}
              tabIndex={-1}
              className="view_editor_jodit"
              config={{
                readonly: true,
                toolbar: false,
                showCharsCounter: false,
                showWordsCounter: false,
                showStatusbar: true,
                showPoweredBy: false,
              }}
            />
          </div>
          <Row>
            <div className=" float-left pt-5 pb-10">
              <Space size={[0, 8]} wrap>
                {/* {detailArticle.hashtags.split(", ").map((el) => (
                  <Tag bordered={false} className="rounded-lg">
                    <Link href={`/articel?hashtag=`}>{el}</Link>
                  </Tag>
                ))} */}
              </Space>
            </div>
          </Row>
        </Col>
      </Row>
      <div style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}>
        <div
          className="pt-16 "
          style={{
            borderBottom: "1px solid rgba(242, 242, 242, 1)",
          }}
        >
          <div>
            <a href="">
              <Avatar src={anh1} style={{ width: "72px", height: "72px" }} />
            </a>
          </div>
          <div className="flex -mt-3 mb-3 justify-between">
            <div>
              <h3 className="text-2xl font-medium mb-3">
                <a href="" className="text-black">
                  Written by {detailArticle.name}
                </a>
              </h3>
              <a href="">206K Followers</a>
              <p>
                Chào các bạn mình là Hải cute, cảm ơn các bạn đã ủng hộ bài viết
                của mình.
              </p>
            </div>
            <div className="mt-6 ">
              <Button
                className="rounded-3xl border-black bg-black px-4 py-2 text-white h-9 w-16 leading-2"
                style={{
                  borderRadius: "30px",
                }}
              >
                Follow
              </Button>
              <Button
                className=" border-2 border-black bg-black  text-sm  ml-2"
                style={{
                  borderRadius: "99em",
                  padding: "4px 9px",
                  color: " rgba(255, 255, 255, 1)",
                  lineHeight: "10px",
                }}
              >
                <MailOutlined className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetaiConsorArticle;
