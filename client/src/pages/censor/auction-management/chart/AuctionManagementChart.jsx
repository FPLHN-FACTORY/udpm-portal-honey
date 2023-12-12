import { CheckCircleOutlined, FlagOutlined, SendOutlined, StopOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { DemoLine } from './ChartLine';
import './index.css';
import AuctionTableGift from './AuctionTableGift';
import { AuctionChartAPI } from '../../../../apis/censor/auction/auctionLine.api';

const AuctionManagementChart = () => {
    const [statistic, setStatistic] = useState({});
    useEffect(() => {
        AuctionChartAPI.fetchStatistic().then((response) => {
            console.log(response.data.data);
            setStatistic(response.data.data)
        })
    }, [])

    return (
        <div id='auction_chart'>
            <Row gutter={12}>
                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số phiên</span>}
                    value={statistic.sumAuction}
                    valueStyle={{
                        color: "#3f8600",
                    }}
                    prefix="⏳"
                    suffix="Phiên"
                    />
                </Card>
                </Col>
                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số lượng vật phẩm</span>}
                    value={statistic.sumNumberGift}
                    valueStyle={{
                        color: "#003eff",
                    }}
                    prefix="🎁"
                    suffix="Vật phẩm"
                    />
                </Card>
                </Col>

                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số mất khởi điểm</span>}
                    value={statistic.sumStartPrice}
                    valueStyle={{
                        color: "#ff5c00;",
                    }}
                    prefix="🍯"
                    suffix="Mật"
                    />
                </Card>
                </Col>

                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số mật đấu giá </span>}
                    value={statistic.sumLastPrice}
                    valueStyle={{
                        color: "#cf1322",
                    }}
                            prefix="🍯"
                            suffix="Mật"
                    />
                </Card>
                </Col>
            </Row>
            <Row>

            </Row>
            <Row gutter={12}>
                <Col xl={16} lg={24} sm={24} md={24} className="mb-6 min-h-screen">
                    <Card bordered={false}>
                        <h4>Biểu đồ thống kê số lượng vật phẩm đấu giá</h4>
                        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
                        <DemoLine></DemoLine>
                    </Card>
                </Col>
                <Col xl={8} lg={24} sm={24} md={24} className="mb-6 min-h-screen">
                    <Card bordered={false} className='h-100%'>
                        <h4>Vật phẩm</h4>
                        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
                        <AuctionTableGift></AuctionTableGift>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AuctionManagementChart;