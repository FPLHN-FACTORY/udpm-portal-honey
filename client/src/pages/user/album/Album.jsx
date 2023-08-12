import { useEffect, useState } from "react";

import { Card, Col, Row, Image, Button, Modal, Form, Input, Select } from "antd";
import "./album.css";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AddAlbum, GetAlbum, SetAlbum } from "../../../app/reducers/album/album.reducer";
import { AlbumAPI } from "../../../apis/user/guest/album/user.album.api";

export default function Album() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(false);

    const getAllAlbum = () => {
        AlbumAPI.fetchAllAlbum().then((response) => {
            dispatch(SetAlbum(response.data.data));
        })
    }

    const dataAlbum = useAppSelector(GetAlbum);

    useEffect(() => {
        getAllAlbum();
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleClickAlbum = (id) => {
        navigate(`/user/album/${id}`);
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleSubmit = (values) => {
        const data = {
            title: values.title,
            status: values.status,
        };
        addAlbum(data);
        setShowModal(false);
    };

    const addAlbum = async (data) => {
        try {
            const response = await AlbumAPI.addAlbum(data);
            dispatch(AddAlbum(response.data));
        } catch (error) {
            console.error("Error adding album:", error);
        }
        getAllAlbum();
    };

    return (
        <div>
            <Row>
                <Col span={22}></Col>
                <Col span={2}><Button onClick={handleOpenModal} type="primary" className="btn-add">Add Album</Button></Col>
            </Row>
            {dataAlbum.map((a) => (
                <Card className="mb-4"
                    onClick={() => handleClickAlbum(a.id)}
                >
                    <Row>
                        <Col span={2} className="col-anh">
                            <Image
                                alt="example"
                                src={a.userImg}
                                style={{
                                    width: "320px",
                                    height: "100px",
                                    borderRadius: "5px",
                                }}
                            />
                        </Col>
                        <Col span={20}>
                            <span className="title">
                                {a.title}
                            </span>
                            <Row>
                                <span className="text-lg">{a.userName}</span>
                            </Row>
                            <div className="-mt-5">
                                <span className="text-5xl text-slate-900 font-normal mr-1">
                                    .
                                </span>
                                <span>{formatDate(a.creatAt)}</span>
                            </div>
                        </Col>
                    </Row>
                </Card>
            ))}
            {showModal && (
                <Modal
                    title="Add Album"
                    open={showModal}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    <Form onFinish={handleSubmit}>
                        <Form.Item label="Title" name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter album title",
                                },
                                {
                                    pattern:
                                        /^[a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
                                    message: "Title cannot contain special characters or symbols",
                                },
                                {
                                    min: 2,
                                    message: "Title must be at least 2 characters long",
                                },
                                {
                                    max: 250,
                                    message: "Title cannot be more than 250 characters long",
                                }
                            ]}>
                            <Input value={title} onChange={handleTitleChange} className="input"/>
                        </Form.Item>
                        <Form.Item label="Status" name="status"
                        rules={[{
                            required: true,
                            message: "You need to select a status of your album",
                        }]}>
                            <Select value={status} onChange={handleStatusChange}>
                                <Select.Option value={false}>Public</Select.Option>
                                <Select.Option value={true}>Private</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 9,
                                span: 24,
                            }}
                        >
                            <Button key="cancel" onClick={handleCloseModal} className="submit-button">
                                Close
                            </Button>
                            <Button htmlType="submit" type="primary" className="submit-button ml-2">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    )
}