import React, { useState, useEffect } from "react";
import "./index.css";
import { Avatar, Button, Col, Divider, Dropdown, Row } from "antd";
import {
  RollbackOutlined,
  DownOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { CommentAPI } from "../../../apis/user/comment.api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  AddComments,
  AddReply,
  GetComments,
  SetComments,
} from "../../../app/reducers/comments/comments.reducer";
import { GetNotification } from "../../../app/reducers/notification/notification.reducer";
import {
  connectStompClient,
  getStompClient,
} from "../../../apis/stomp-client/config";
import { idUser } from "../../../AppConfig";
import moment from "moment";

const DemoComment = () => {
  const dispatch = useAppDispatch();
  const [editorContent, setEditorContent] = useState({});
  const [contentComment, setContentComment] = useState("");
  const [myValue, setMyValue] = useState("");
  const { id } = useParams();
  const [activeReplyId, setActiveReplyId] = useState(null);

  useEffect(() => {
    connectStompClient();
  }, []);

  const stompClient = getStompClient();
  const notificationCount = useAppSelector(GetNotification);
  const connect = () => {
    stompClient.connect({}, () => {
      stompClient.subscribe(
        "/portal-articles/create-comment/" + id,
        (message) => {
          let user = JSON.parse(message.body).data.user;
          let comment = JSON.parse(message.body).data.comment;
          if (comment.reply == null) {
            dispatch(AddComments({ user: user, comment: comment }));
          } else {
            console.log("ghsgsgsgsg");
            dispatch(AddReply({ user: user, comment: comment }));
          }
        }
      );
      stompClient.subscribe(
        "/portal-articles/create-notification-user/" + idUser,
        function (message) {
          const data = JSON.parse(message.body).data;
        }
      );
    });
  };

  useEffect(() => {
    if (stompClient != null && id != null) {
      connect();
    }

    return () => {
      if (stompClient != null && id != null) {
        getStompClient().disconnect();
      }
    };
  }, [stompClient, id]);

  const findCommentByArticleId = () => {
    CommentAPI.findCommentByArticleId(id).then((response) => {
      dispatch(SetComments(response.data.data));
    });
  };

  useEffect(() => {
    findCommentByArticleId();
  }, []);

  const dataComment = useAppSelector(GetComments);
  const [textareas, setTextareas] = useState({});
  const [showMore, setShowMore] = useState(false);

  const handleLinkClick = (commentId) => {
    if (activeReplyId && activeReplyId !== commentId) {
      handleCancelClick(activeReplyId);
    }
    setTextareas((prevTextareas) => ({
      ...prevTextareas,
      [commentId]: { visible: true, replying: true },
    }));
    const data = {
      articlesId: id,
      reply: commentId,
      content: editorContent,
    };
    setActiveReplyId(commentId);
    stompClient.send("/action/create-comment/" + id, {}, JSON.stringify(data));
  };

  const handleCancelClick = (commentId) => {
    setTextareas((prevTextareas) => ({
      ...prevTextareas,
      [commentId]: { visible: false, replying: false },
    }));
    setActiveReplyId(null);
  };

  const handleReplyClick = (commentId) => {
    setEditorContent((prevTextareas) => ({
      ...prevTextareas,
      [commentId]: { ...prevTextareas[commentId], replying: false },
    }));
    const data = {
      articlesId: id,
      reply: commentId,
      content: myValue,
    };
    setEditorContent("");
    stompClient.send("/action/create-comment/" + id, {}, JSON.stringify(data));
  };

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const handleTagClick = (userName, id) => {
    const replyContent = `@${userName} `;
    setEditorContent((prevContents) => ({
      ...prevContents,
      [id]: replyContent,
    }));
  };

  const handleTextareaChange = (commentId, value) => {
    setEditorContent((prevContents) => ({
      ...prevContents,
      [commentId]: value,
    }));
    setMyValue(value);
  };

  const createComment = () => {
    const data = {
      articlesId: id,
      reply: null,
      content: contentComment,
    };
    stompClient.send("/action/create-comment/" + id, {}, JSON.stringify(data));
    setTimeout(() => {
      stompClient.send("/action/create-notification-user/" + idUser, {});
    }, 500);
    setContentComment("");
  };

  //   const [current, setCurrent] = useState("");

  //   const menu = (
  //     <Menu onClick={onClick} selectedKeys={[current]}>
  //       <Menu.Item key="setting:1">
  //         <FileExclamationOutlined />
  //         Báo cáo
  //       </Menu.Item>
  //     </Menu>
  //   );
  //   const onClick = (e) => {
  //     setCurrent(e.key);
  //   };
  const [showEllipsis, setShowEllipsis] = useState({});

  // Các hàm để xử lý hover và không hover
  const handleMouseEnter = (replyId) => {
    setShowEllipsis((prev) => ({ ...prev, [replyId]: true }));
  };

  const handleMouseLeave = (replyId) => {
    setShowEllipsis((prev) => ({ ...prev, [replyId]: false }));
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <div className="content-item">
      <section>
        <div>
          <h3 className="pull-left">New Comment</h3>
          <Row>
            <Col xs={2} className="row">
              <div className="">
                <Avatar
                  className="w-14 h-14"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
              </div>
            </Col>
            <Col xs={22} className="">
              <textarea
                style={{ resize: "none" }}
                className="form-control"
                id="message"
                placeholder="Write comment"
                required=""
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
              ></textarea>
              <div>
                <button
                  onClick={createComment}
                  type="submit"
                  className="button1"
                >
                  Submit
                </button>
              </div>
            </Col>
          </Row>

          <div className="media">
            <h3>Comments</h3>
            {dataComment.map((comment, index) => (
              <div key={index} className="mb-2 comment-container">
                <Row className="flex justify-between">
                  <Col>
                    <Row>
                      <div className="">
                        <span>
                          <Avatar
                            className="w-10 h-10"
                            src="https://i.imgur.com/uIgDDDd.jpg"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="-mt-5 ml-2">
                        <h4>{comment.userName}</h4>
                        <p className="-mt-5">
                          {moment(comment.browseDate).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </Row>
                  </Col>
                </Row>

                <div className="ml-12">
                  <p className="-mt-2">{comment.content}</p>
                </div>

                {comment.listReply.map((reply, replyIndex) => (
                  <div
                    key={replyIndex}
                    className="mb-2 ml-10 reply-container"
                    onMouseEnter={() => handleMouseEnter(reply.id)}
                    onMouseLeave={() => handleMouseLeave(reply.id)}
                  >
                    <Row className="flex justify-between">
                      <Row>
                        <div className="">
                          <span>
                            <Avatar
                              className="w-10 h-10"
                              src="https://i.imgur.com/uIgDDDd.jpg"
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="-mt-5 ml-2">
                          <h4>{reply.userName}</h4>
                          <p className="-mt-5">
                            {moment(reply.browseDate).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </Row>
                    </Row>

                    <div className="ml-12">
                      <Row className="flex justify-between">
                        <Col xs={22}>
                          <p className="-mt-2">{reply.content}</p>
                        </Col>
                        {/* Nút ba chấm, sẽ hiển thị khi hover vào reply */}
                        <Col xs={1} className="ml-1 -mt-2">
                          {showEllipsis[reply.id] && (
                            <Dropdown
                              trigger={["click"]}
                              menu={{
                                items,
                              }}
                              placement="bottomRight"
                              arrow={{
                                pointAtCenter: true,
                              }}
                            >
                              <button className="ellipsis-button">
                                <EllipsisOutlined />
                              </button>
                            </Dropdown>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
                {/* Ô reply */}
                <div className="reply-wrapper">
                  <span
                    className="reply"
                    onClick={() => {
                      handleLinkClick(comment.id);
                      handleTagClick(comment.userName, comment.id);
                    }}
                  >
                    <RollbackOutlined />
                    <span className="ml-2">Reply</span>
                  </span>

                  {textareas[comment.id]?.visible && (
                    <div className="mt-3">
                      <Col xs={24}>
                        <textarea
                          className="area"
                          value={editorContent[comment.id] || ""}
                          onChange={(e) =>
                            handleTextareaChange(comment.id, e.target.value)
                          }
                        />
                      </Col>
                      <div>
                        {textareas[comment.id]?.replying ? (
                          <Button
                            className="button2"
                            onClick={() => handleReplyClick(comment.id)}
                          >
                            Trả lời
                          </Button>
                        ) : (
                          <Button
                            className="button2"
                            onClick={() => handleLinkClick(comment.id)}
                          >
                            Trả lời
                          </Button>
                        )}
                        <Button
                          onClick={() => handleCancelClick(comment.id)}
                          className="button2"
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <Divider />
            {/* COMMENT 1 - END */}
          </div>
          {/* Show more comment */}
          {!showMore && (
            <div className="show-more">
              <Button
                type="link"
                onClick={handleShowMoreClick}
                className="button3"
              >
                <DownOutlined />
                Xem thêm (2)
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DemoComment;
