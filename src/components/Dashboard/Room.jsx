import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.scss";
import {
  Card,
  CardContent,
  TextField,
  Modal,
  Button as Button1,
  Checkbox,
  Row,
  Form,
  Input,
  Space,
  Table,
  Tag,
  Col,
  Select
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Divider } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button as button1, Flex } from "antd";
import instance from "../services/axios";
import { useNavigate } from "react-router-dom";

function Room({ data, setData }) {
  const [dataroom, dataroomchange] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAgain, setGetAgian] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [active, setActive] = useState(0);
  const [type, setType] = useState(0);
  const websocket = React.useRef(null);
  // update to parent component
  useEffect(() => {
    const getAllKey = async () => {
      websocket.current = new WebSocket("ws://159.223.71.166:8120");
      const res = await instance.get("/key");
      // update to parent component
      // establish websocket
      dataroomchange(res.data);
      websocket.current.onopen = () => {
        console.log("connected");
      };
      websocket.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.length === 0) {
            setActive(0);
            // set isActice false in dataRoom
            setData([]);
            dataroomchange(
              res.data.map((item) => {
                return {
                  ...item,
                  isActive: false
                };
              })
            );
            return;
          } else {
            // set isActice true in dataRoom
            for (let i = 0; i < data.length; i++) {
              setActive(data.length);
              setData(data);

              dataroomchange(
                res.data.map((item) => {
                  if (item.key === data[i].id) {
                    return {
                      ...item,
                      isActive: true
                    };
                  }
                  return item;
                })
              );
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
    };
    getAllKey();
  }, []);

  // socket onMessage

  const onFinish = async (values) => {
    let res;
    try {
      if (edit) {
        res = await instance.put(`/key/${id}`, {
          name: values.roomname,
          device1: values.device1,
          device2: values.device2,
          device3: values.device3,
          device4: {
            label: values.device4,
            Chart: type
          },
          device5: values.device5,
          device6: values.device6
        });
        // update dataroom
        const newDataroom = dataroom.map((item) => {
          if (item._id === id) {
            return res.data;
          }
          return item;
        });
        dataroomchange(newDataroom);
      } else {
        res = await instance.post("/key/create", {
          name: values.roomname,
          device1: values.device1,
          device2: values.device2,
          device3: values.device3,
          device4: {
            label: values.device4,
            Chart: type
          },
          device5: values.device5,
          device6: values.device6
        });
        dataroomchange([...dataroom, res.data]);
      }
      setIsModalOpen(false);
      // push new data to dataroom
      // reset form
      form.resetFields();
      // show toast
      toast.success(edit ? "Cập nhật phòng thành công" : "Tạo phòng thành công");
      setId(null);
      setEdit(false);
      setGetAgian(!getAgain);
    } catch (error) {
      toast.error(edit ? "Cập nhật phòng thất bại" : "Tạo phòng thất bại");
      setGetAgian(!getAgain);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleDelete = async (id) => {
    try {
      await instance.delete(`/key/${id}`);
      const newDataroom = dataroom.filter((item) => item._id !== id);
      dataroomchange(newDataroom);
      toast.success("Xóa phòng thành công");
      setGetAgian(!getAgain);
    } catch (error) {
      toast.error("Xóa phòng thất bại");
      setGetAgian(!getAgain);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalEdit = ({ id, name, device1, device2, device3, device4, device4Type, device5, device6 }) => {
    form.setFieldsValue({
      roomname: name,
      device1: device1,
      device2: device2,
      device3: device3,
      device4: device4,
      device4Type: device4Type,
      device5: device5,
      device6: device6
    });
    setId(id);
    setIsModalOpen(true);

    setEdit(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container className="col bg-body-tertiary">
        <div className="head-bar pt-5 d-flex justify-content-between">
          <Divider orientation="left" orientationMargin="0">
            <span className="text-uppercase fw-bold fs-4">Vị trí</span>
          </Divider>
        </div>
        <div className="badge-button mt-3 d-flex ">
          <button className="btn btn-outline-secondary btn-sm me-3">
            Tổng số thiết bị <span className="badge text-bg-secondary">{dataroom && dataroom.length}</span>
          </button>
          <button className="btn btn-outline-secondary  btn-sm">
            Thiết bị đang hoạt động <span className="badge text-bg-secondary">{active}</span>
          </button>
          <button type="button" className="btn btn-success ms-auto" size="small" onClick={showModal}>
            <i class="bi  bi-plus"></i>Thêm phòng
          </button>
        </div>
        <div className="table-devices pt-4">
          <table className="table table-hover table-sm ">
            <thead>
              <tr className="table-warning">
                <th>TT</th>
                <th>Vị trí</th>
                <th>Key</th>

                <th>Hoạt động</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {dataroom && dataroom.length > 0 ? (
                // Dataroom && Dataroom.length > 0 ?
                dataroom &&
                dataroom.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>

                      <td role="button" className="text-warning">
                        {item.isActive ? (
                          <Link
                            to={`/dashboard/${item._id}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit"
                            }}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <>{item.name}</>
                        )}
                      </td>
                      <td role="button" className="text-warning">
                        {item.isActive ? (
                          <Link
                            to={`/dashboard/${item._id}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit"
                            }}
                          >
                            {item.key}
                          </Link>
                        ) : (
                          <>{item.key}</>
                        )}
                      </td>
                      <td>
                        {item.isActive ? (
                          <Tag color="success">Hoạt động</Tag>
                        ) : (
                          <Tag color="error">Không hoạt động</Tag>
                        )}
                      </td>
                      <td>
                        <ButtonGroup variant="text" aria-label="outlined button group">
                          <Button
                            size="small"
                            onClick={() => {
                              showModalEdit({
                                id: item._id,
                                name: item.name,
                                device1: item.device1,
                                device2: item.device2,
                                device3: item.device3,
                                device4: item.device4?.label,
                                device4Type: item.device4?.Chart,
                                device5: item.device5,
                                device6: item.device6
                              });
                            }}
                          >
                            <i class="bi bi-pencil"></i>
                          </Button>
                          <Button size="small">
                            <i
                              class="bi  bi-trash"
                              onClick={() => {
                                if (item.isActive) {
                                  toast.error("Không thể xóa phòng đang hoạt động");
                                  return;
                                }
                                handleDelete(item._id);
                              }}
                            ></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="info">
                        Chưa có thiết bị nào trong phòng | <b>Nhấn 'Thêm thiết bị' để tạo thiết bị mới</b>
                      </Alert>
                    </Stack>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
      <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel} width={800}>
        <Card sx={{ minWidth: 400 }}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            style={{
              maxWidth: 700
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên Phòng"
              name="roomname"
              rules={[
                {
                  required: true,
                  message: "Ten phong khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thiet Bi 1"
              name="device1"
              rules={[
                {
                  required: true,
                  message: "Mo ta khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thiet Bi 2"
              name="device2"
              rules={[
                {
                  required: true,
                  message: "Mo ta khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thiet Bi 3"
              name="device3"
              rules={[
                {
                  required: true,
                  message: "Mo ta khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>
            {/* // Col */}
            <Row>
              <Col span={12}>
                <Form.Item label="Cảm biến 4" name="device4">
                  <Input
                    style={{
                      width: 100
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Loai bieu do" name="device4Type">
                  <Select
                    style={{
                      width: 150
                    }}
                    defaultValue={type}
                    onChange={(value) => {
                      setType(value);
                    }}
                    options={[
                      {
                        label: "Biểu đò nhiệt độ",
                        value: 0
                      },
                      {
                        label: "Biểu đồ gas",
                        value: 1
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Cảm Biến 5"
              name="device5"
              rules={[
                {
                  required: true,
                  message: "Mo ta khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Cảm biến 6"
              name="device6"
              rules={[
                {
                  required: true,
                  message: "Mo ta khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default Room;
