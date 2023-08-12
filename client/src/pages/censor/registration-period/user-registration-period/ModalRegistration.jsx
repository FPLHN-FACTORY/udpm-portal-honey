import React, { useEffect } from 'react';
import { Button, Col, Input, Modal, Row, Space, Table, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { CensorRegistrationUserAPI } from '../../../../apis/censor/registration-user/registration-user.api';
import { GetRegistrationUser, SetRegistrationUser } from '../../../../app/reducers/registration-user/registration-user.reducer';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useState } from 'react';
import { SetUser } from '../../../../app/reducers/users/users.reducer';
import { SetRegistrationPeriod } from '../../../../app/reducers/registration-period/registration-period.reducer';

const ModalRegistration = (props) => {
  const dispatch = useAppDispatch();
  const { modalOpen, setModalOpen, id, numberAll } = props;
  const [ dataFerch, setDataFerch] = useState([]);

  const [dataSelectedRowKeys, setDataSelectedRowKeys] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleChange = (record, newValue) => {
    if (!newValue || newValue === 0) {
      newValue = 1;
    }
    const newData = [...dataFerch];
    const dataIndex = newData.findIndex((item) => item.idUser === record.idUser);
    newData[dataIndex] = { ...newData[dataIndex], numberArticles: newValue };
    setDataFerch(newData);
    console.log(newData);
  };

  useEffect(() => {
    setDataFerch(dataFerch)
    const newData = []
    // eslint-disable-next-line array-callback-return
    dataFerch.filter((el) => {
      if (selectedRowKeys.filter((newEl) => el.idUser === newEl).length !== 0) {
      newData.push( {
        idRegistrationPeriod: id,
        usersId: el.idUser,
        numberArticles: el.numberArticles,
        reminderStatus: 0,
      })
    }
  })
  setDataSelectedRowKeys(newData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFerch])

  const setAllArtcle = () => {
    if (dataSelectedRowKeys.length === 0) {
      Modal.error({
        title: "Thông báo",
        content: "Mời bạn chọn giảng viên !!!",
        okText: "Đồng ý"
      })
      return;
    }
    if (numberAll < dataSelectedRowKeys.length) {
      Modal.error({
        title: "Thông báo",
        content: "Số lượng bài viết tối thiểu quá ít so với số lượng giảng viên",
        okText: "Đồng ý"
      })
      return;
    }
    let chiaDiem = 0;
    const dataIndex = [];
    for (let index = 1; index <= Math.ceil(numberAll / dataSelectedRowKeys.length); index++) {
      // eslint-disable-next-line no-loop-func
      data.forEach((item) => {

        let dem = true;
        selectedRowKeys.forEach((el) => {
          if (item.idUser === el) dem = false;
          return;
        });
        if (!dem) {
          chiaDiem++;

          if (chiaDiem <= numberAll && chiaDiem > numberAll - dataSelectedRowKeys.length) {
            item = {
              ...item,
              numberArticles: index,
            };
          }
        }
        
        if (chiaDiem <= numberAll && chiaDiem > numberAll - dataSelectedRowKeys.length) {
          dataIndex.push(item)
        }
      });
    }
    dataIndex.sort((a, b) => a.stt - b.stt);

    console.log(dataIndex);
    setDataFerch(dataIndex);
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
        align: 'center',
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
        dataIndex: 'numberArticles',
      align: 'center',
      render: (_, record) => {
        let number = record.numberArticles
        return  <>
          <Space >
            <Input type="number" value={number} min={1} 
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
                  <Button 
                  type="ghost"
                  
                  onClick={() => {
                  const request = {
                    idRegistrationPeriod: id,
                    usersId: record.idUser,
                    numberArticles: record.numberArticles,
                    reminderStatus: 0,
                  };
                  updateAll([request])
                }}
                        style={{ color: '#fff', fontSize: "16px" }}
                          className='bg-green-400  hover:bg-green-300  hover:border-green-300 mx-5'>
                    <UserAddOutlined />
                  </Button>
              </Space>
            ),
        },
  ];
  
    useEffect(() => {
      fetchAll()
      console.log("connect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAll = () => {
      CensorRegistrationUserAPI.fetchUserNotInRes({}, id).then((response) => {
      const data = response.data.data.map((row, index) => ({ ...row, key: row.idUser, numberArticles: 1 }));
        dispatch(SetRegistrationUser(data));
        setDataFerch(data);
      });
  }
  
  const fetchAllRes = () => {
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
  
      const data = useAppSelector(GetRegistrationUser);

  const handleOk = () => {
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const updateAll = (data) => {
      CensorRegistrationUserAPI.update(data, id).then((response) => {
        if (response.data) {
          message.success("Thêm giảng viên vào đợt thành công")
          fetchAllRes();
          handleCancel();
        } else {
          message.error("Thêm giảng viên vào đợt thất bại")
        }
      }); 
    
  }
  
  const onSelectChange = (newSelectedRowKeys) => {
    const newData = []
    // eslint-disable-next-line array-callback-return
    dataFerch.filter((el) => {
        if (newSelectedRowKeys.filter((newEl) => el.idUser === newEl).length !== 0) {
        newData.push( {
          idRegistrationPeriod: id,
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
  
  return (
    <>
          <Modal title="Thêm giảng viên vào đợt" width={"auto"} style={{top: "20px"}} open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
            <Row>
                <Col span={12} >
                    <h1>Danh sách giảng viện trong đợt</h1>
                </Col>
                <Col span={12} className='flex justify-end items-center'>
                <Button 
                    type="ghost"
                onClick={() => {
                  setAllArtcle();
                    }}
                          style={{ color: '#fff', fontSize: "16px" }}
                            className='bg-green-400  hover:bg-green-300  hover:border-green-300 mx-5'>
                      Chia đều bài
                    </Button>
                  <Button 
                    type="ghost"
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
                    }}
                          style={{ color: '#fff', fontSize: "16px" }}
                            className='bg-green-400  hover:bg-green-300  hover:border-green-300 mx-5'>
                      Phân bài
                    </Button>
                </Col>
            </Row>
                <Table
                    rowSelection={{
                    ...rowSelection,
                    }}
                    
                    id='tableRes'
                    columns={columns}
                    dataSource={dataFerch}
                />
        </div>
      </Modal>
    </>
  );
};
export default ModalRegistration;