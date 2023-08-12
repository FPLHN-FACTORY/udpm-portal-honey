import { useEffect, useState } from 'react';
import React from 'react';
import { Card, Row, Col, Image, Menu, Dropdown } from "antd";
import "./history.css";
import { Link } from 'react-router-dom';
import {
    DeleteOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetHistory, SetHistory } from "../../../app/reducers/history/history.reducer";
import { UserHistoryAPI } from '../../../apis/user/auth/history/history-user.api';

export default function History() {
    const dispatch = useAppDispatch();
    const [groupedHistory, setGroupedHistory] = useState([]);

    useEffect(() => {
        const fetchAllHistory = async () => {
            try {
                const response = await UserHistoryAPI.fetchAllHistory();
                dispatch(SetHistory(response.data.data));
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };
        fetchAllHistory();
    }, []);

    const dataHistory = useAppSelector(GetHistory);

    useEffect(() => {
        // Group history by browseDate
        const groupedData = dataHistory.reduce((groups, history) => {
            const date = new Date(history.browseDate).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(history);
            return groups;
        }, {});

        // Convert object to array
        const groupedArray = Object.keys(groupedData).map(date => {
            return {
                browseDate: date,
                histories: groupedData[date]
            };
        });

        setGroupedHistory(groupedArray);
    }, [dataHistory]);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleDropdownMore = (e) => {
        console.log("Dropdown 2 clicked:", e.key);
    };

    const moreOption = (
        <Menu onClick={handleDropdownMore}>
            <Menu.Item key="optionA">
                <DeleteOutlined className="mr-2" />
                Xóa
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            {groupedHistory.map(group => (
                <Card key={group.browseDate} className="card-group" title={<b>{group.browseDate}</b>}>
                    {group.histories.map((his, index) => (
                        <div key={his.id} className="history-item">
                            <Row>
                                <Col span={4}>
                                    <Image
                                        width={150}
                                        src={his.img}
                                    />
                                </Col>
                                <Col span={19}>
                                    <Link to={``}><h3 className="title-history">{his.title.length > 100 ? `${his.title.substring(0, 100)} ...` : his.title}</h3></Link>
                                    <span>{his.name} - {formatDate(his.createAt)}</span>
                                    <p>{his.descriptive.length > 250 ? `${his.descriptive.substring(0, 250)} ...` : his.descriptive}</p>
                                </Col>
                                <Col span={1}>
                                    <div className="more-menu">
                                        <Dropdown overlay={moreOption} trigger={["hover"]}>
                                            <MoreOutlined />
                                        </Dropdown>
                                    </div>
                                </Col>
                            </Row>
                            {index < group.histories.length - 1 && <hr className="divider" />}
                        </div>
                    ))}
                </Card>
            ))}
        </div>
    )
}
