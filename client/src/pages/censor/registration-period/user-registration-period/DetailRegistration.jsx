import { Button, Card, Form } from 'antd';
import React from 'react';
import TableRegistration from './TableDetail';
import ModalRegistration from './ModalRegistration';
import { useEffect, useState } from "react";
import { CensorRegistrationUserAPI } from '../../../../apis/censor/registration-user/registration-user.api';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { GetRegistrationPeriod, SetRegistrationPeriod } from '../../../../app/reducers/registration-period/registration-period.reducer';

// http://localhost:3000/censor/registration-period/bb307065-2e30-4936-bf78-219f91c57d2f

export default function DetailRegistration() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        let dem = 0;
        CensorRegistrationUserAPI.fetchAll({}, id).then((response) => {
            response.data.data.censorUserInRegistrationReponses.forEach(el => {
                dem = dem + el.numberArticles;
            })
            response.data.data.registrationPeriod.restNumber = dem;
            const data = response.data.data.registrationPeriod;
            dispatch(SetRegistrationPeriod(data));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const registrationPeriod = useAppSelector(GetRegistrationPeriod);
    const [showModal, setShowModal] = useState(false);

    const fromDate = registrationPeriod.fromDate ? new Date(registrationPeriod.fromDate) : null;

    // Định dạng ngày trực tiếp từ đối tượng Date (không sử dụng thư viện bên ngoài)
    const formattedDate = fromDate
    ? `${fromDate.getDate()}/${fromDate.getMonth() + 1}/${fromDate.getFullYear()}`
        : 'Chưa có ngày bắt đầu';
        const toDate = registrationPeriod.fromDate ? new Date(registrationPeriod.fromDate) : null;

        // Định dạng ngày trực tiếp từ đối tượng Date (không sử dụng thư viện bên ngoài)
        const formattedtoDate = toDate
        ? `${toDate.getDate()}/${toDate.getMonth() + 1}/${toDate.getFullYear()} ` : 'Chưa có ngày kết thúc';
    return (
        <>
            {showModal && (
                <ModalRegistration
                modalOpen={showModal}
                setModalOpen={setShowModal}
                    width={1200}
                    id={id}
                    numberAll={ registrationPeriod.numberArticles - registrationPeriod.restNumber }
                />
            )}
            <h1 style={{ fontSize: '22px' }}>Đợt đăng ký { registrationPeriod.name }</h1>
            <Card className='px-10 pt-5'>
                <Form
                    name="basic"
                    labelCol={{ span: 6, }}
                    labelAlign='left'
                    wrapperCol={{span: 18,}}
                >
                    <Form.Item
                    label="Mã đợt đăng ký"
                    name="code"
                    >
                        <label style={{ background: "#fff", color: "red" }} >{registrationPeriod.code}</label>
                    </Form.Item>
                    <Form.Item
                    label="Tên đợt đăng ký"
                    name="username"
                    >
                        <label style={{ background: "#fff", color: "red" }} >{registrationPeriod.name}</label>
                    </Form.Item>
                    <Form.Item
                    label="Ngày bắt đầu"
                    name="fromDate"
                    >
                        <label style={{ background: "#fff", color: "red" }} >{ formattedDate }</label>
                    </Form.Item>

                    <Form.Item
                    label="Ngày kết thúc"
                    name="toDate"
                    >
                    <label style={{ background: "#fff", color: "red" }} >{ formattedtoDate }</label>
                    </Form.Item>
                    <Form.Item
                    label="Số lượng bài viết quy định trong kỳ"
                    name="number"
                    >
                        <label style={{ background: "#fff", color: "red" }} >{ registrationPeriod.numberArticles } Bài</label>
                    </Form.Item>
                    <Form.Item
                    label="Số lượng bài viết số lượng bài viết đã giao"
                    name="number"
                    >
                        <label style={{ background: "#fff", color: "red" }} >{ registrationPeriod.restNumber } Bài</label>
                    </Form.Item>
                    <Form.Item
                    label="Số lượng bài viết số lượng bài viết chưa giao"
                    name="number"
                    >
                        <label style={{ background: "#fff", color: "red" }} >{ registrationPeriod.numberArticles - registrationPeriod.restNumber } Bài</label>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        >
                        <Link type="link"
                            to={`/censor/registration-period`}
                            style={{ color: '#fff',     borderRadius: '5px',     padding: '10.5px 15px'}}
                            className='bg-red-500 hover:bg-red-400  hover:border-red-400 mx-5'>Close</Link>
                        <Button type="primary" onClick={() => {setShowModal(true)}}>
                                Thêm giảng viên vào đợt
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className='mt-12' >
                <TableRegistration />
            </Card>
        </>
    );
};

