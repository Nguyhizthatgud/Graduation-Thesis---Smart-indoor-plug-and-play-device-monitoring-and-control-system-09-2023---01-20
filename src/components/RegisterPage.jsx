import React, { useContext, useMemo, useRef, useState } from "react";
import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { LoadingOutlined, HomeOutlined, UserOutlined, HomeFilled } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Tooltip from "@mui/material/Tooltip";
import { message, Upload } from "antd";
// use context set value for context
import { UserContext } from "../context/ContextProvider";
import instance from "./services/axios";
import { ToastContainer, toast } from "react-toastify";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
};
const formTailLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 8,
    offset: 4
  }
};
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
function RegisterPage() {
  const Navigate = useNavigate();
  // use context set value for context
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const userContext = useContext(UserContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); // [1]
  const [avialable, setAvialable] = useState(true); // [1]
  const videoRef = useRef(null);
  const mediaStreamConstraints = {
    video: true
  };
  const onMediaSuccess = (stream) => {
    videoRef.current.srcObject = stream;
  };
  const onMediaError = (error) => {
    console.error("media error", error);
    message.error(
      "Unable to access the camera. Please ensure that a camera is installed and not currently being used by another application."
    );
  };
  useMemo(() => {
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(onMediaSuccess).catch(onMediaError);
  }, []);
  const handleTakePhoto = async () => {
    // create form data
    setAvialable(false);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const dataURI = canvas.toDataURL("image/jpeg");
    const image = new Image();
    image.src = dataURI;
    setImage(image);
    setButtonDisabled(true);
  };
  const handleSubmit = async () => {
    if (avialable) {
      message.error("Please take photo");
      return;
    }
    // create form data
    if (!image) {
      message.error("Please take photo");
      return;
    }
    if (!form.getFieldValue("username")) {
      message.error("Please input username");
      return;
    }
    if (!form.getFieldValue("password")) {
      message.error("Please input password");
      return;
    }

    const formData = new FormData();
    const password = form.getFieldValue("password");
    const username = form.getFieldValue("username");
    // convert base64 to file
    const file = dataURLtoFile(image.src, "image.jpg");
    try {
      formData.append("username", username);
      formData.append("password", password);
      formData.append("images", file);
      // react toastify chain
      setLoading(true);
      const response = await instance.post("/signUpWithImage", formData);
      // show toast
      toast.success("Đăng ký thành công", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true
      });
      //turning off camera using
      const videoElement = document.querySelector("video");
      const mediaStream = videoElement.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoElement.srcObject = null;
      //direct to login page
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error(error.response?.data?.message || "Lỗi Đăng ký", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true
      });
      // reset all state
      setImage(null);
      form.resetFields();
      Navigate("/auth");
    }
  };
  return (
    <div className="app vh-100  d-flex align-items-center">
      <div className="container bg-tertiary">
        <div className="form py-4 row justify-content-center">
          <div className="col-md-12 col-lg-10 rounded">
            <div className="d-md-flex wrap border rounded ">
              <img src={require("../1.jpg")} className="img" alt="..." />

              <div className="container">
                <div>
                  <Divider>
                    <img src={require("../logo1.png")} width="40" alt="" />
                  </Divider>
                </div>
                <div className="d-flex ps-1 pb-3 flex-column justify-content-center">
                  <h3 className="ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1">Register</h3>
                  <div className="form ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1">
                    <Form
                      form={form}
                      name="dynamic_rule"
                      style={{
                        maxWidth: 600
                      }}
                      {...layout}
                    >
                      <Form.Item
                        name="username"
                        label="Name/Email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name"
                          }
                        ]}
                      >
                        <Input placeholder="Please input your name" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!"
                          }
                        ]}
                        hasFeedback
                      >
                        <Input.Password showCount maxLength={10} />
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!"
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error("The new password that you entered do not match!"));
                            }
                          })
                        ]}
                      >
                        <Input.Password showCount maxLength={10} />
                      </Form.Item>
                      <Form.Item
                        style={{
                          height: 300,
                          marginLeft: 60
                        }}
                      >
                        {image ? (
                          <img
                            src={image.src}
                            alt="webcam"
                            style={{ width: 300, height: 300, paddingBottom: 20, paddingTop: 20 }}
                          />
                        ) : (
                          <div>
                            <div
                              className="framebox"
                              style={{
                                width: 300,
                                height: 300,
                                display: "flex",
                                position: "absolute",
                                zIndex: "1",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <div
                                className="facebox"
                                style={{
                                  width: "50%",
                                  height: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "10%"
                                }}
                              >
                                <div></div>
                                <TbUserSquare style={{ fontSize: "50px", opacity: 0.3 }} />
                              </div>
                            </div>
                            <video ref={videoRef} autoPlay style={{ width: 300, height: 300 }} />
                          </div>
                        )}
                      </Form.Item>
                      <div className="d-flex align-items-center justify-content-center">
                        <Tooltip title="Take photo">
                          <Button
                            className="me-3 d-flex justify-items-center align-items-center"
                            type="primary"
                            onClick={() => {
                              handleTakePhoto();
                            }}
                            disabled={buttonDisabled}
                          >
                            Chụp ảnh
                          </Button>
                        </Tooltip>
                        <Tooltip title="Đăng ký">
                          <Button
                            className="me-5 d-flex justify-items-center align-items-center"
                            type="primary"
                            onClick={handleSubmit}
                            disabled={loading === true ? true : false}
                            style={{ position: "absolute", right: "3.5rem" }}
                          >
                            {loading === true ? <LoadingOutlined /> : "Đăng ký"}
                          </Button>
                        </Tooltip>
                      </div>
                    </Form>
                  </div>
                  <Divider style={{ display: "flex-row", flexWrap: "wrap" }}>
                    <Breadcrumb
                      items={[
                        {
                          href: "/",
                          title: (
                            <>
                              <HomeFilled />
                              <span>Homepage</span>
                            </>
                          )
                        },
                        {
                          href: "/auth",
                          title: (
                            <>
                              <UserOutlined />
                              <span>sign-in page</span>
                            </>
                          )
                        }
                      ]}
                    />
                  </Divider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
