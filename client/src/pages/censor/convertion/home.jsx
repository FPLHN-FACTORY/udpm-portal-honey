import { Button, Card, Input, Select } from "antd";
import React from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import axios from "axios";

export default function Home() {
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectGift, setSelectGift] = useState("");
  const [pointGift, setPoinGift] = useState("");
  const [pointCategory, setPoinCategory] = useState("");
  const [selectPointGift, setSelectPoinGift] = useState("");
  const [selectPointCategory, setSelectPoinCategory] = useState("");
  const [conversionCode, setConversionCode] = useState("");

  const [fillName, setFillName] = useState({ nameCate: "", nameGift: "" });

  useEffect(() => {
    fechCategory();
    fechGift();
  }, []);

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };

  const fechGift = () => {
    GiftAPI.fetchAllGift().then((response) => {
      setFillGift(response.data.data);
    });
  };

  const handleCategoryBlur = () => {
    setSelectPoinCategory(pointCategory);
  };

  const handleGiftBlur = () => {
    setSelectPoinGift(pointGift);
  };

  const handleConversation = async () => {
    const ratio = parseFloat(selectPointCategory) / parseFloat(selectPointGift);

    const code = `${parseInt(Math.random() * 100000)}`;
    // ${fillName.nameCate}/${fillName.nameGift}
    // setConversionRatio(ratio);
    setConversionCode(code);

    try {
      const dataToSend = {
        ratio: ratio,
        code: code,
        giftId: selectGift,
      };

      await axios.post(
        "http://localhost:2508/api/censor/conversion/add",
        dataToSend
      );
      console.log("tỉ số và mã đã được lưu vào db");
    } catch (error) {
      console.log("lỗi khi lưu tỉ số và mã", error);
    }
  };

  return (
    <>
      <Card className="mb-2">
        <div
          style={{
            paddingLeft: "80px",
            paddingTop: "50px",
            paddingBottom: "130px",
            border: "5px solid black",
          }}
        >
          <form class="flex items-center" style={{ marginBottom: "40px" }}>
            <div class="relative w-full mr-6">
              <span
                className="text-xl"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "20px",
                }}
              >
                {" "}
                Category:
              </span>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                style={{ width: "35%", marginRight: "20px" }}
                value={selectCategory}
                onChange={(value, label) => {
                  setSelectCategory(value);
                  setFillName({ ...fillName, nameCate: label.label });
                }}
                options={fillCategory.map((item) => {
                  return { label: item.name, value: item.id };
                })}
              />
              =
              <Input
                style={{
                  borderRadius: "10px",
                  width: "35%",
                  marginLeft: "20px",
                }}
                placeholder=""
                value={pointCategory}
                onChange={(e) => setPoinCategory(e.target.value)}
                onBlur={handleCategoryBlur}
              />
              <span
                className="text-xl"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "20px",
                }}
              >
                {" "}
                Điểm
              </span>
            </div>
          </form>

          <form class="flex items-center">
            <div class="relative w-full mr-6">
              <span
                className="text-xl"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "20px",
                  marginLeft: "40px",
                }}
              >
                {" "}
                Gift:
              </span>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                style={{ width: "35%", marginRight: "20px" }}
                value={selectGift}
                onChange={(value, label) => {
                  setSelectGift(value);
                  setFillName({ ...fillName, nameGift: label.label });
                }}
                options={fillGift.map((item) => {
                  return { label: item.name, value: item.id };
                })}
              />
              =
              <Input
                style={{
                  borderRadius: "10px",
                  width: "35%",
                  marginLeft: "20px",
                }}
                placeholder=""
                value={pointGift}
                onChange={(e) => setPoinGift(e.target.value)}
                onBlur={handleGiftBlur}
              />
              <span
                className="text-xl"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "20px",
                }}
              >
                {" "}
                Điểm
              </span>
            </div>
          </form>
          <form style={{ paddingLeft: "100px" }}>
            <div style={{ marginTop: "50px" }}>
              <div style={{ display: "block", marginBottom: "50px" }}>
                <span style={{ fontSize: "18px", marginRight: "100px" }}>
                  {fillName.nameCate}
                </span>
                <span style={{ fontSize: "18px" }}>{pointCategory}</span>
              </div>

              <div style={{ display: "block", marginBottom: "60px" }}>
                <span style={{ fontSize: "18px", marginRight: "100px" }}>
                  {fillName.nameGift}
                </span>
                <span style={{ fontSize: "18px" }}>{pointGift}</span>
              </div>
            </div>
            {selectPointCategory && selectPointGift && (
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  Tỉ số thu được :
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    marginRight: "20px",
                  }}
                >
                  {selectPointCategory}/{selectPointGift}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {fillName.nameCate}/{fillName.nameGift}
                  {/* {conversionCode} */}
                </span>
              </div>
            )}

            <Button
              type="primary"
              style={{ marginLeft: "700px" }}
              onClick={handleConversation}
            >
              Quy đổi
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
}
