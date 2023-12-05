import { CheckCircleOutlined, FlagOutlined, SendOutlined, StopOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import { DemoLine } from './ChartLine';
import './index.css';
import AuctionTableGift from './AuctionTableGift';

const AuctionManagementChart = () => {
    return (
        <div id='auction_chart'>
            <Row gutter={12}>
                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số phiên</span>}
                    value={233}
                    valueStyle={{
                        color: "#3f8600",
                    }}
                    prefix={<CheckCircleOutlined />}
                    suffix="Phiên"
                    />
                </Card>
                </Col>
                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số lượng vật phẩm</span>}
                    value={33}
                    valueStyle={{
                        color: "#003eff",
                    }}
                    prefix={<SendOutlined />}
                    suffix="Vật phẩm"
                    />
                </Card>
                </Col>

                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng sinh viên tạo phiên</span>}
                    value={32}
                    valueStyle={{
                        color: "#ff5c00;",
                    }}
                    prefix={<FlagOutlined />}
                    suffix="Người"
                    />
                </Card>
                </Col>

                <Col xl={6} lg={12} sm={24} md={24} className="mb-6">
                <Card bordered={false}>
                    <Statistic
                    title={<span>Tổng số phiên thành công </span>}
                    value={43}
                    valueStyle={{
                        color: "#cf1322",
                    }}
                    prefix={<StopOutlined />}
                    suffix="Bài"
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