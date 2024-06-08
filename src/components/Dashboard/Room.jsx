import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.scss";
import {
  Card,
  Modal,
  Button as Button1,
  Row,
  Form,
  Input,
  Tag,
  Col,
  Select,
} from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Divider } from "antd";

import instance from "../services/axios";

function Room({ data, setData, setDataroom }) {
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
  // creat a paginate for table
  // get all key

  useEffect(() => {
    const getAllKey = async () => {
      websocket.current = new WebSocket("ws://157.245.51.60:8120");
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
                  isActive: false,
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
                      isActive: true,
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
  }, [setData]);
  setDataroom(dataroom);
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
            Chart: type,
          },
          device5: values.device5,
          device6: values.device6,
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
            Chart: type,
          },
          device5: values.device5,
          device6: values.device6,
        });
        dataroomchange([...dataroom, res.data]);
      }
      setIsModalOpen(false);
      // push new data to dataroom
      // reset form
      form.resetFields();
      // show toast
      toast.success(
        edit ? "Cập nhật phòng thành công" : "Tạo phòng thành công"
      );
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
  const showModalEdit = ({
    id,
    name,
    device1,
    device2,
    device3,
    device4,
    device4Type,
    device5,
    device6,
  }) => {
    form.setFieldsValue({
      roomname: name,
      device1: device1,
      device2: device2,
      device3: device3,
      device4: device4,
      device4Type: device4Type,
      device5: device5,
      device6: device6,
    });
    setId(id);
    setIsModalOpen(true);

    setEdit(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="col Room bg-body-tertiary"
        style={{
          height: "100vh",
          backgroundImage:
            "linear-gradient(to right, hsl(0deg 0% 91.37%),hsl(0deg 0% 78.43%)  ",
        }}
      >
        <div className="head-bar pt-5 d-flex justify-content-between">
          <Divider orientation="left" orientationMargin="0">
            <span className="text-uppercase fw-bold fs-4">Vị trí</span>
          </Divider>
        </div>
        <div className="badge-button mt-3 d-flex ">
          <button className="btn btn-outline-secondary btn-sm me-3">
            Tổng số thiết bị{" "}
            <span className="badge text-bg-secondary">
              {dataroom && dataroom.length}
            </span>
          </button>
          <button className="btn btn-outline-secondary  btn-sm">
            Thiết bị đang hoạt động{" "}
            <span className="badge text-bg-secondary">{active}</span>
          </button>
          <button
            type="button"
            className="btn btn-success ms-auto"
            size="small"
            onClick={showModal}
          >
            <i class="bi  bi-plus"></i>Thêm phòng
          </button>
        </div>
        <Card className="table-devices mt-4">
          <table className="table table-hover table-sm ">
            <thead>
              <tr className="table-warning flex flex-center">
                <th>TT</th>
                <th>Vị trí</th>
                <th>Mã kết nối</th>
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
                      <td>{idx + 1}</td>

                      <td role="button" className="text-warning">
                        {item.isActive ? (
                          <Link
                            to={`/dashboard/${item._id}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
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
                            style={{ textDecoration: "none", color: "inherit" }}
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
                        <ButtonGroup
                          variant="text"
                          aria-label="outlined button group"
                        >
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
                                device6: item.device6,
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
                                  toast.error(
                                    "Không thể xóa phòng đang hoạt động"
                                  );
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
                        Chưa có thiết bị nào trong phòng |{" "}
                        <b>Nhấn 'Thêm thiết bị' để tạo thiết bị mới</b>
                      </Alert>
                    </Stack>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        width={800}
      >
        <Card sx={{ minWidth: 400 }}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 700,
            }}
            initialValues={{
              remember: true,
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
                  message: "Tên phòng không được để trống",
                },
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
                  message: "Mô tả không được để trống",
                },
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
                  message: "Mô tả không được để trống",
                },
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
                  message: "Mô tả không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Row>
              <Col span={12}>
                <Form.Item label="Cảm biến 4" name="device4">
                  <Input
                    style={{
                      width: 100,
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Loai bieu do" name="device4Type">
                  <Select
                    style={{
                      width: 150,
                    }}
                    defaultValue={type}
                    onChange={(value) => {
                      setType(value);
                    }}
                    options={[
                      {
                        label: "Biểu đò nhiệt độ",
                        value: 0,
                      },
                      {
                        label: "Biểu đồ gas",
                        value: 1,
                      },
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
                  message: "Mô tả không được để trống",
                },
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
                  message: "Mô tả không được để trống",
                },
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
