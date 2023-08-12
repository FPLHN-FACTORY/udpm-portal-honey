import { useEffect, useState } from "react";
import { Card, Row, Col, Dropdown, Menu, Pagination } from "antd";
import {
  DeleteOutlined,
  MoreOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { ArticleTrashAPI } from "../../../apis/user/auth/trash/trash-article.api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetArticles,
  SetArticles,
} from "../../../app/reducers/articles/articles.reducer";
import { useLocation, useNavigate } from "react-router-dom";

export default function Trash() {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const displayedPage = current + 1;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAllArticleTrash = async () => {
      try {
        const response = await ArticleTrashAPI.fetchAllArticleTrash({
          page: current,
        });
        dispatch(SetArticles(response.data.data.data));
        setTotal(response.data.data.totalPages);
        setCurrent(current);
        const queryParams = new URLSearchParams();
        queryParams.set("page", current + 1);
        navigate(`${location.pathname}?${queryParams.toString()}`);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchAllArticleTrash();
  }, [current, location.pathname, navigate]);

  const handleRestoreClick = (id) => {
    ArticleTrashAPI.restore(id)
      .then((response) => {
        dispatch(SetArticles(response.data.data));
      })
      .catch((error) => {});
  };

  const handleDeleteTrashClick = (id) => {
    ArticleTrashAPI.deleteTrash(id)
      .then((response) => {
        // const updatedTrashs = [...dataTrashs];
        // updatedTrashs.splice(index, 1);
        dispatch(SetArticles(response.data.data));
      })
      .catch((error) => {});
  };

  const moreOption = (trashId) => (
    <Menu onClick={handleDeleteTrashClick(trashId)}>
      <Menu.Item key="optionA">
        <DeleteOutlined className="mr-2" />
        Delete
      </Menu.Item>
      <Menu.Item onClick={() => handleRestoreClick(trashId)}>
        <ReloadOutlined className="mr-2" />
        Restore
      </Menu.Item>
    </Menu>
  );

  const handlePaginationChange = (page) => {
    setCurrent(page - 1);
  };

  const dataTrashs = useAppSelector(GetArticles);

  const groupTrashsByDate = (trashs) => {
    const groupedData = {};

    trashs.forEach((trash) => {
      const date = new Date(trash.browseDate).toLocaleDateString();

      if (groupedData[date]) {
        groupedData[date].push(trash);
      } else {
        groupedData[date] = [trash];
      }
    });

    return groupedData;
  };

  const groupedTrashs = groupTrashsByDate(dataTrashs);

  return (
    <div>
      {Object.keys(groupedTrashs).map((date) => (
        <Card key={date} className="card-group" title={date}>
          {groupedTrashs[date].map((trash, index) => (
            <div key={trash.id} className="trash-item">
              <Row align="middle">
                <Col span={20}>
                  <p className="title-trash">{trash.title}</p>
                </Col>
                <Col span={4}>
                  <div className="more-menu">
                    <Dropdown
                      overlay={moreOption(trash.id)}
                      trigger={["click"]}
                    >
                      <MoreOutlined />
                    </Dropdown>
                  </div>
                </Col>
              </Row>
              {index < groupedTrashs[date].length - 1 && (
                <hr className="divider" />
              )}
            </div>
          ))}
        </Card>
      ))}
      <div className="mt-5 text-center">
        <Pagination
          simple
          current={displayedPage}
          onChange={handlePaginationChange}
          total={total * 10}
        />
      </div>
    </div>
  );
}
