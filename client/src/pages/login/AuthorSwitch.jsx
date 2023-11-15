import React, { useEffect } from "react";
import { Col, Row, Tooltip } from "antd";

import "./login.css";
import {
  deleteToken,
  getRolesUse,
  getToken,
  isTokenValid,
  setRolesUse,
  setToken,
} from "../../helper/userToken";
import { connectIdentity } from "../../AppConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AuthorSwitch = () => {
  const navigate = useNavigate();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const tokenValue = urlSearchParams.get("Token");
  const location = useLocation();
  deleteToken();

  useEffect(() => {
    const token = getToken();
    if (!tokenValue) {
      if (isTokenValid(token)) {
        urlSearchParams.set("Token", token);
        navigate(`${location.pathname}?${urlSearchParams.toString()}`);
        switchRole(getRolesUse());
        // setRolesUse("");
      }
    } else {
      if (isTokenValid(tokenValue)) {
        setToken(tokenValue);
        switchRole(getRolesUse());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swtichRole = (roleCode) => {
    if (tokenValue) {
      if (isTokenValid(tokenValue)) {
        let listRole = [];
        const decodedToken = jwtDecode(tokenValue);
        if (!Array.isArray(decodedToken.role)) {
          listRole.push({
            code: decodedToken.role,
            name: decodedToken.roleNames,
          });
        } else {
          for (let index = 0; index < decodedToken.role.length; index++) {
            const roleCode = decodedToken.role[index];
            const roleName = decodedToken.roleNames[index];
            listRole.push({ code: roleCode, name: roleName });
          }
        }
        if (listRole.filter((el) => el.code === getRolesUse()).length <= 0) {
          deleteToken();
        }
      }
    }

    const token = getToken();
    if (isTokenValid(token)) {
      switchRole(roleCode);
      return;
    }

    deleteToken();
    window.location.href = connectIdentity;
    setRolesUse(roleCode);
  };

  const switchRole = (roleCode) => {
    switch (roleCode) {
      case "ADMIN":
        navigate("/censor/gift");
        break;
      case "TEACHER":
        navigate("/teacher/add-point");
        break;
      case "STUDENT":
        navigate("/student");
        break;
      case "PRESIDENT":
        navigate("/president/add-item");
        break;
      default:
        navigate("/author-switch?Token=" + getToken());
        break;
    }
  };

  return (
    <div
      id="auth_switch"
      className="flex justify-center items-center min-h-screen "
      style={{ overflow: "hidden", background: "#eda736" }}
    >
      <Row
        style={{}}
        gutter={16}
        className="pl-7 pr-7 justify-around items-center cards w-full"
      >
        <Tooltip title={"Admin"} className=" card">
          <Col
            xl={5}
            lg={12}
            className="form-switch ease-in-out duration-300 rounded-md shadow-xl my-6 mx-6 cursor-pointer"
            style={{ background: "#fff" }}
            onClick={() => swtichRole("ADMIN")}
          >
            Admin
          </Col>
        </Tooltip>
        <Tooltip title={"Giảng viên"} className=" card">
          <Col
            xl={5}
            lg={12}
            className="form-switch ease-in-out duration-300 rounded-md shadow-xl my-6 mx-6 cursor-pointer"
            style={{ background: "#fff" }}
            onClick={() => swtichRole("TEACHER")}
          >
            Giảng viên
          </Col>
        </Tooltip>
        <Tooltip title={"Sinh viên"} className=" card">
          <Col
            xl={5}
            lg={12}
            className="form-switch ease-in-out duration-300 rounded-md shadow-xl my-6 mx-6 cursor-pointer"
            style={{ background: "#fff" }}
            onClick={() => swtichRole("STUDENT")}
          >
            Sinh viên
          </Col>
        </Tooltip>
        <Tooltip title={"Chủ tịch"} className=" card">
          <Col
            xl={5}
            lg={12}
            className="form-switch ease-in-out duration-300 rounded-md shadow-xl my-6 mx-6 cursor-pointer"
            style={{ background: "#fff" }}
            onClick={() => swtichRole("PRESIDENT")}
          >
            Chủ tịch
          </Col>
        </Tooltip>
      </Row>
    </div>
  );
};

export default AuthorSwitch;
