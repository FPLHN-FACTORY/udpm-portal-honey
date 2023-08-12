import React, { useEffect } from 'react';
import { Button, Col, Input, Modal, Row, Space, Table, Tooltip, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CensorRegistrationUserAPI } from '../../../../apis/censor/registration-user/registration-user.api';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { GetUser, SetUser } from '../../../../app/reducers/users/users.reducer';
import { SetRegistrationPeriod } from '../../../../app/reducers/registration-period/registration-period.reducer';

const TableRegistration = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSelectedRowKeys, setDataSelectedRowKeys] = useState([]);

  const data = useAppSelector(GetUser);

  const onSelectChange = (newSelectedRowKeys) => {
    const newData = []
    // eslint-disable-next-line array-callback-return
    data.filter((el) => {
        if (newSelectedRowKeys.filter((newEl) => el.idUser === newEl).length !== 0) {
        newData.push( {
          idRegistrationPeriod: el.idUserRegist,
          usersId: el.idUser,
          numberArticles: el.numberArticles,
          reminderStatus: 0,
        })
      }
      })
    setDataSelectedRowKeys(newData);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
    
  useEffect(() => {
    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchAll = () => {
    CensorRegistrationUserAPI.fetchAll({}, id).then((response) => {
      const data = response.data.data.censorUserInRegistrationReponses.map((row, index) => ({ ...row, key: row.idUser }));
      dispatch(SetUser(data));
      let dem = 0;
      response.data.data.censorUserInRegistrationReponses.forEach(el => {
        dem = dem + el.numberArticles;
    })
      response.data.data.registrationPeriod.restNumber = dem;
      const dataRes = response.data.data.registrationPeriod;
      dispatch(SetRegistrationPeriod(dataRes));
  });
  }

  const handleChange = (record, newValue) => {
    if (newValue === undefined) {
      newValue = 0;
    }
    const newData = [...data];
    const dataIndex = newData.findIndex((item) => item.idUser === record.idUser);
    newData[dataIndex] = { ...newData[dataIndex], numberArticles: newValue };
    dispatch(SetUser(newData));
  };

  const deleteAll = (data) => {
    CensorRegistrationUserAPI.delete(data, id).then((response) => {
      if (response.data) {
        message.success("Xóa thành công")
        setDataSelectedRowKeys([]);
        setSelectedRowKeys([]);
        fetchAll()
      } else {
        message.error("Xóa thất bại")
      }
  });
  }
  
  const updateAll = (data) => {
      CensorRegistrationUserAPI.update(data, id).then((response) => {
        if (response.data) {
          message.success("Update thành công")
          fetchAll();
        } else {
          message.error("Update thất bại")
        }
      }); 
  }
  
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      width: 50,
      render: (text) => <span className='align-middle'>{text}</span>,
    },
    {
      title: 'Mã giảng viên',
      dataIndex: 'code',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'name',
      align: 'center',
      render: (text) => <span className='align-middle'>{text}</span>,
    },
    {
      title: 'Số lượng bài viết tối thiểu',
      dataIndex: 'numberArticle',
      align: 'center',
      render: (_, record) => {
        let number = record.numberArticles
        return  <>
          <Space >
            <Input type="number" defaultValue={number} min={0} 
              onChange={(el) => handleChange(record, el.target.valueAsNumber)}
             />    
          </Space>
        </>
      }
    },
    {
        title: 'Action',
      dataIndex: 'active',
        width: 150,
        align: 'center',
        render: (_, record) => (
          <Space >
            <Tooltip title="Update">
              <Button 
                onClick={() => {
                  if (record.numberArticles === undefined) {
                    Modal.error({
                      title: "Thông báo",
                      content: "Mời bạn nhập số lượng bài viết tối thiểu.",
                      okText: "Đồng ý"
                    })
                    return;
                  }
                  if (record.numberArticles <= 0) {
                    Modal.error({
                      title: "Thông báo",
                      content: "Số lượng bài viết tối thiểu phải lớn hơn 0.",
                      okText: "Đồng ý"
                    })
                    return;
                  }
                    Modal.confirm({
                      title: 'Xác nhận cập nhật',
                      content: 'Bạn có chắc chắn muốn cập nhật dữ liệu này?',
                      okText: 'Đồng ý',
                      cancelText: 'Hủy',
                      onOk() {
                        const request = {
                          idRegistrationPeriod: record.idUserRegist,
                          usersId: record.idUser,
                          numberArticles: record.numberArticles,
                          reminderStatus: 0,
                        };
                        updateAll([request])
                      },
                    });
                  }}
                          style={{ color: '#fff', fontSize: "16px" }}
                      className='bg-orange-400  hover:bg-orange-300  hover:border-orange-300 mx-5'>
                <EditOutlined className="icon" />
              </Button>
                </Tooltip>
                
            <Tooltip title="Delete">
              <Button type="ghost" 
                onClick={() => {
                    Modal.confirm({
                      title: 'Xác nhận xóa',
                      content: 'Bạn có chắc chắn muốn xóa dữ liệu này?',
                      okText: 'Đồng ý',
                      cancelText: 'Hủy',
                      onOk() {
                        const request = {
                          idRegistrationPeriod: record.idUserRegist,
                          usersId: record.idUser,
                          numberArticles: record.numberArticles,
                          reminderStatus: 0,
                        };
                        deleteAll([
                            request
                        ])
                      },
                      
                    });
                }}
                          style={{ color: '#fff', fontSize: "16px" }}
                        className='bg-red-500  hover:bg-red-400  hover:border-red-400 mx-5'><DeleteOutlined /></Button>
                    </Tooltip>
          </Space>
        ),
    },
  ];
  
  return (
      <div>
          <Row>
              <Col span={12} >
                <h1>Danh sách giảng viện trong đợt</h1>
              </Col>
              <Col span={12} className='flex justify-end items-center'>
                <Button type="ghost"
            style={{ color: '#fff' }}
            onClick={() => {
              if (dataSelectedRowKeys.length === 0) {
                Modal.error({
                  title: "Thông báo",
                  content: "Mời bạn chọn giảng viên !!!",
                  okText: "Đồng ý"
                })
                return;
              }
              Modal.confirm({
                title: 'Xác nhận xóa',
                content: 'Bạn có chắc chắn muốn xóa dữ liệu này?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                  deleteAll(dataSelectedRowKeys);
                },
                
              });
            }}
            
                    className='bg-red-500  hover:bg-red-400  hover:border-red-400 mx-5'>Delete</Button>
                <Button
            onClick={() => {
              
              if (dataSelectedRowKeys.length === 0) {
                Modal.error({
                  title: "Thông báo",
                  content: "Mời bạn chọn giảng viên !!!",
                  okText: "Đồng ý"
                })
                return;
              }

              Modal.confirm({
                title: 'Xác nhận cập nhật',
                content: 'Bạn có chắc chắn muốn cập nhật dữ liệu này?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                  updateAll(dataSelectedRowKeys)
                },
              });
            }} type="primary">
                    Update
                </Button>
              </Col>
          </Row>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
            />
    </div>
  );
};
export default TableRegistration;