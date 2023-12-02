import { Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { AuctionChartAPI } from '../../../../apis/censor/auction/auctionLine.api';

const AuctionTableGift = () => {
  // const [sizeUserAnalytics, setSizeUserAnalytics] = useState(10);
  const sizeUserAnalytics = 5;
    const [currentUserAnalytics, setCurrentUserAnalytics] = useState(1);
    const [totalUserAnalytics, setTotalUserAnalytics] = useState(0);
    const [data, setData] = useState([]);


    useEffect(() => {
      AuctionChartAPI.fetchTables({
      page: currentUserAnalytics - 1,
      size: sizeUserAnalytics}).then((response) => {
        setData(response.data.data.data);
        console.log(response.data.data);
        setTotalUserAnalytics(response.data.data.totalPages)
    });
    }, [currentUserAnalytics]);
  
    useEffect(() => {
      asyncFetch();
    }, []);
  
  const asyncFetch = () => {
    AuctionChartAPI.fetchTables().then((response) => {
      setData(response.data.data.data);
      setTotalUserAnalytics(response.data.data.totalPages)
    });
  }
    const columns = [
        {
          title: "#",
          dataIndex: "stt",
          key: "stt",
        },
        {
          title: "Tên vật phẩm",
          dataIndex: "giftName",
          key: "giftName",
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          key: "quantity",
          align: "center",
        },
    ];
    
    return (
        <div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
            />
            <div className="mt-5 text-center">
              <Pagination
                onChange={(value) => {
                  setCurrentUserAnalytics(value);
                }}
                current={currentUserAnalytics}
                total={totalUserAnalytics * 10}
              />
            </div>
        </div>
    );
};

export default AuctionTableGift;