import { Button, Card } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ResultUser from "./ResultUser";
import { FullSearchTextAPI } from "../../../apis/user/auth/full-search-text/full-search-text.api.js";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  AddArticles,
  GetArticles,
} from "../../../app/reducers/articles/articles.reducer";
import { AddUser, GetUser } from "../../../app/reducers/users/users.reducer";
import CardDemo from "../card/ViewCard";

const AllFullTS = (props) => {
  const dispatch = useAppDispatch();

  const articles = useAppSelector(GetArticles);
  const user = useAppSelector(GetUser);

  useEffect(() => {
      fetchFullSearch();
  }, [props.search]);

  const fetchFullSearch = () => {
    FullSearchTextAPI.getSearchAll({ page: 0, search: props.search }).then((response) => {
      response.data.data.forEach((element) => {
        console.log(element);
        if (element.classify === 1) {
          dispatch(AddArticles(element));
        } else if (element.classify === 2) {
          dispatch(AddUser(element));
        }
      });
    });
  };

  return (
    <div>
      <Card className="mb-5">
        <div className="-mt-4">
          <p className="text-xl">Mọi người</p>
          <ResultUser data={user}></ResultUser>
          <Button
            type="primary"
            block
            className=" mt-3"
            style={{ fontSize: "15px", backgroundColor: "#2e2e2e" }}
          >
            Xem tất cả
          </Button>
        </div>
      </Card>
      <CardDemo data={articles}></CardDemo>
    </div>
  );
};

export default AllFullTS;
