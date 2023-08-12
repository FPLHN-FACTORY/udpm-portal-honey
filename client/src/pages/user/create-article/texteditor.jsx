// // npm install jodit-react html-react-parser --save
import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Input, Card, Button, Row, Col, Select, message, Alert } from "antd";
import { FolderAddOutlined, SendOutlined } from "@ant-design/icons";
import { MyArticleAPI } from "../../../apis/user/auth/article/my-article.api";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import {
  AddArticles,
  UpdateArticles,
} from "../../../app/reducers/articles/articles.reducer";
const Texteditor = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [isUpdatePage, setIsUpdatePage] = useState(false);
  const [error, setError] = useState("");
  const [registrationPeriod, setRegistrationPeriod] = useState([]);
  const [selectedRegistrationPeriodId, setSelectedRegistrationPeriodId] =
    useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleHashtagsChange = (value) => {
    setHashtags(value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const validateForm = () => {
    if (title.length < 6 || title.length > 250) {
      setError("Title must be between 6 and 250 characters");
      return false;
    }
    if (hashtags.length === 0) {
      setError("Hashtags must not be empty");
      return false;
    }
    if (content.length === 0) {
      setError("Content must not be empty");
      return false;
    }
    setError("");
    return true;
  };

  const config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 500,
    direction: "ltr",
    language: "en",
    debugLanguage: false,
    i18n: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colorPickerDefaultTab: "background",
    imageDefaultWidth: 400,
    removeButtons: [],
    disablePlugins: ["paste", "stat"],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "",
    showXPathInStatusbar: false,
  };

  const options = [{ value: "Xuan Hai", label: "Xuan Hai" }];

  const processText = (text) => {
    const strippedText = text
      .replace(/<\/?[^>]+(>|$)/g, " ")
      .replace(/(&nbsp;)+/g, " ");
    const words = strippedText.split(" ");
    const first60Words = words.slice(0, 60);
    const first60WordsString = first60Words.join(" ");
    return first60WordsString;
  };

  const handlePublish = () => {
    if (!validateForm()) {
      return;
    }
    const descriptive = processText(content);
    const data = {
      title: title,
      hashtag: hashtags,
      content: content,
      descriptive: descriptive,
      idRegistrationPeriod: selectedRegistrationPeriodId,
    };
    if (!isUpdatePage) {
      MyArticleAPI.createArticleToCensor(data)
        .then((result) => {
          dispatch(AddArticles(result.data.data));
          navigate(`/user/my-article`);
          message.success("Submit request for approval successfully!");
        })
        .catch((error) => {
          message.error("Failed to submit request for approval");
        });
    } else {
      MyArticleAPI.updateArticleTCensor(data, id)
        .then((result) => {
          dispatch(UpdateArticles(result.data.data));
          navigate(`/user/my-article`);
          message.success("Submit request for approval successfully!");
        })
        .catch((error) => {
          message.error("Failed to submit request for approval");
        });
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const descriptive = processText(content);
    const data = {
      title: title,
      hashtag: hashtags,
      content: content,
      descriptive: descriptive,
      idRegistrationPeriod: selectedRegistrationPeriodId,
    };
    if (!isUpdatePage) {
      MyArticleAPI.createDraftArticle(data)
        .then((result) => {
          dispatch(AddArticles(result.data.data));
          navigate(`/user/my-article`);
          message.success("Draft saved successfully!");
        })
        .catch((error) => {
          message.error("Failed to save draft");
        });
    } else {
      MyArticleAPI.updateDraftArticle(data, id)
        .then((result) => {
          dispatch(UpdateArticles(result.data.data));
          navigate(`/user/my-article`);
          message.success("Draft saved successfully!");
        })
        .catch((error) => {
          message.error("Failed to save draft");
        });
    }
  };

  const handleRegistrationPeriodChange = (value, option) => {
    setSelectedRegistrationPeriodId(value);
  };

  useEffect(() => {
    MyArticleAPI.fetchRegistraition().then((res) => {
      setRegistrationPeriod(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedRegistrationPeriodId(res.data.data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    setIsUpdatePage(!window.location.href.includes("create-article"));
    if (isUpdatePage) {
      MyArticleAPI.detailMyArticle(id)
        .then((result) => {
          const { title, hashtags, content } = result.data.data;
          setTitle(title);
          setHashtags(hashtags.split(", "));
          setContent(content);
        })
        .catch((error) => {
          message.error("Failed to fetch article details");
        });
    }
  }, [id, isUpdatePage]);

  return (
    <Card>
      {error && <Alert message={error} type="error" showIcon />}
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "8px" }}>Registration Period:</label>
        <Select
          value={selectedRegistrationPeriodId}
          style={{
            width: 320,
            borderRadius: 8,
            marginBottom: 15,
            border: "1px solid #ccc",
          }}
          bordered={false}
          onChange={handleRegistrationPeriodChange} // Gọi hàm handleSelectChange khi giá trị thay đổi
        >
          {registrationPeriod.map((period) => (
            <Select.Option key={period.id} value={period.id}>
              {period.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Input addonBefore="Title" value={title} onChange={handleTitleChange} />
      <Row className="mt-5 mb-2">
        <Col span={18}>
          <Select
            mode="tags"
            className="w-10/12"
            size="large"
            onChange={handleHashtagsChange}
            tokenSeparators={[","]}
            options={options}
            placeholder="Hashtag"
            value={hashtags}
          />
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            shape="round"
            icon={<FolderAddOutlined />}
            size="large"
            onClick={handleSave}
            className="flex justify-center items-center"
          >
            Save
          </Button>
        </Col>
        <Col span={3}>
          <Button
            type={isUpdatePage ? "default" : "primary"}
            shape="round"
            icon={<SendOutlined />}
            size="large"
            onClick={handlePublish}
            className="flex justify-center items-center"
          >
            {isUpdatePage ? "Update" : "Publish"}
          </Button>
        </Col>
      </Row>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleContentChange}
      />
    </Card>
  );
};

export default Texteditor;
