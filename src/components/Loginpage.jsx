import React, { useEffect, useState, useContext } from "react";
import { Col, Divider, Row } from "antd";
import { Button, Form, Input, InputNumber, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FacebookOutlined, UserOutlined, HomeFilled, LockOutlined, GoogleOutlined, GithubOutlined, AppleOutlined } from "@ant-design/icons";

import { Space } from 'antd';
import { Breadcrumb } from 'antd';
import { UserContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import instance from "./services/axios";
import Tooltip from "@mui/material/Tooltip";
// use context set value for context

import "./Loginform.scss";
const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
};
function Loginpage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // use context set value for context
  const userContext = useContext(UserContext);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { username, password } = form.getFieldsValue();
      const res = await instance.post("/loginWithPassword", {username, password });
     
      if (res.status === 200) {
        toast.success("Login success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setTimeout(() => {
          userContext.setUser(res.data.message);
          localStorage.setItem("user", JSON.stringify(res.data.message));
        }, 5000);

      }
      setLoading(false);
    } catch (error) {
      toast.error("Login fail", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setLoading(false);
      console.log(error);
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
                  <h3 className="ps-xl-5 ps-lg-4 ms-lg-5 ms-sm-1">Sign-In</h3>
                  <div className="form " style={{ paddingInlineStart: "6.5rem", paddingTop: "3rem" }}>

                    <Form
                      form={form}
                      name="basic"
                      className="login-form"
                      initialValues={{
                        remember: true,
                      }}
                    >
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Username!',
                          },
                        ]}
                      >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Password!',
                          },
                        ]}
                      >
                        <Input
                          prefix={<LockOutlined className="site-form-item-icon" />}
                          type="password"
                          placeholder="Password"
                        
                        />
                      </Form.Item>
                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                          Forgot password
                        </a>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          className="login-form-button"
                          onClick={handleLogin}
                          disabled={loading === true ? true : false}
                        >
                          Log in
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Link to="/auth/faceid">
                          <Button type="primary" className="login-form-button">
                            Click here to login with FaceID
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        Or <Link to="/auth/register">Register now!</Link>
                      </Form.Item>
                    </Form>
                    <Space style={{ display: "flex-row", paddingTop: "2rem" }}>
                      <GoogleOutlined role="button"/>
                      <Divider type="vertical" />
                      <FacebookOutlined role="button"/>
                      <Divider type="vertical" />
                      <GithubOutlined role="button"/>
                      <Divider type="vertical" />
                      <AppleOutlined role="button"/>
                    </Space>
                  </div>

                </div>
                <Divider
                  style={{ display: 'flex-row', paddingTop: "7rem" }} >
                  <Breadcrumb
                    items={[
                      {
                        href: '/',
                        title: (<>
                          <HomeFilled />
                          <span>Homepage</span>
                        </>),
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
  );
}

export default Loginpage;
