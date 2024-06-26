import React, { useEffect, useState, useRef } from "react";

import { Row, Col, Switch, Badge, Divider, Space } from "antd";
import { PM, Temperature } from "react-environment-chart";
import instance from "./services/axios";
import { useParams } from "react-router-dom";
import { message, Layout, Card } from "antd";
import Box from "@mui/material/Box";
import { RiRemoteControl2Fill } from "react-icons/ri";
import { BiRadioCircle } from "react-icons/bi";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoClipboardOutline } from "react-icons/io5";
import Meta from "antd/lib/card/Meta";
import "./DetailsPage2.scss";
export default function DetailsPage2({ Dataroom }) {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [stateDevice, setStateDevice] = useState(false);
  const [enable, setEnable] = useState(false);
  const [enable2, setEnable2] = useState(false);
  const chartRef = useRef(null);
  const enable3 = React.useRef(false);
  const enable4 = React.useRef(false);
  const websocket = React.useRef(null);
  useEffect(() => {
    const getDetailKey = async () => {
      websocket.current = new WebSocket("ws://206.189.40.229:8120");
      // previous status device
      let prevStatus = {
        device1: null,
        device2: null,
        device3: null,
        device4: null,
        device5: null,
        device6: null
      };
      const res = await instance.get(`/key/${id}`);
      setData(res.data);
      websocket.current.onopen = () => {
        console.log("connected");
      };
      websocket.current.onmessage = (event) => {
        // check if is valid JSON type
        try {
          const data = JSON.parse(event.data);
          if (data.length === 0) {
            setCurrentData([]);
            setStateDevice(false);
            return;
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === res.data.key) {
              setStateDevice(true);

              // Define the devices to check
              const devices = [1, 2, 3, 5, 6];

              // Loop over each device
              for (let j = 0; j < devices.length; j++) {
                const deviceNum = devices[j];
                const deviceKey = `device${deviceNum}`;
                // Initialize the device status if it's null
                if (prevStatus[deviceKey] === null) {
                  prevStatus[deviceKey] = data[i][deviceKey];
                }
                if (
                  data[i][deviceKey] !== prevStatus[deviceKey] &&
                  prevStatus[deviceKey] !== null &&
                  enable3.current !== true &&
                  enable4.current !== true
                ) {
                  //Check if the device status has changed and send a ant design success message if it has "1" is on or off
                  prevStatus[deviceKey] = checkDeviceStatusAndNotify(
                    data[i][deviceKey],
                    prevStatus[deviceKey],
                    deviceNum
                  );
                }
              }

              enable4.current = false;
              enable3.current = false;
              setCurrentData(data[i]);
            }
          }
          // for (let i = 0; i < data.length; i++) {
          //   if (data[i].id === res.data.key) {
          //     setStateDevice(true);
          //     // check prev vs current
          //     if (
          //       data[i].device1 !== prevStatus.device1 &&
          //       prevStatus.device1 !== null &&
          //       enable3.current !== true
          //     ) {
          //       prevStatus.device1 = data[i].device1;
          //     }
          //     if (
          //       data[i].device2 !== prevStatus.device2 &&
          //       prevStatus.device2 !== null &&
          //       enable4.current !== true
          //     ) {
          //       prevStatus.device2 = data[i].device2;
          //     }
          //     if (
          //       data[i].device3 !== prevStatus.device3 &&
          //       prevStatus.device3 !== null
          //     ) {
          //       prevStatus.device3 = data[i].device3;
          //     }
          //     if (
          //       data[i].device5 !== prevStatus.device5 &&
          //       prevStatus.device5 !== null
          //     ) {
          //       prevStatus.device5 = data[i].device5;
          //     }
          //     if (
          //       data[i].device6 !== prevStatus.device6 &&
          //       prevStatus.device6 !== null
          //     ) {
          //       prevStatus.device6 = data[i].device6;
          //     }
          //     if (prevStatus.device1 === null) {
          //       prevStatus.device1 = data[i].device1;
          //     }
          //     if (prevStatus.device2 === null) {
          //       prevStatus.device2 = data[i].device2;
          //     }
          //     if (prevStatus.device3 === null) {
          //       prevStatus.device3 = data[i].device3;
          //     }
          //     if (prevStatus.device5 === null) {
          //       prevStatus.device5 = data[i].device5;
          //     }
          //     if (prevStatus.device6 === null) {
          //       prevStatus.device6 = data[i].device6;
          //     }

          //     enable4.current = false;
          //     enable3.current = false;
          //     setCurrentData(data[i]);
          //   }
          // }
        } catch (err) {
          console.log(err);
        }
      };
    };
    getDetailKey();
  }, [id]);

  console.log(currentData);
  function checkDeviceStatusAndNotify(deviceStatus, prevDeviceStatus, deviceNum) {
    // Check if the device status has changed
    if (deviceStatus !== prevDeviceStatus) {
      // Destroy all existing messages
      message.destroy();

      // Send a success message
      message.success(
        `Thiết bị ${deviceNum} đang được ${deviceStatus === 1 ? "Bật" : "Tắt"}`,
        1 // Message duration in seconds
      );

      // Update the previous device status
      prevDeviceStatus = deviceStatus;
    }

    return prevDeviceStatus;
  }
  const onChangeDevice1 = (checked) => {
    // wait 1 second
    websocket.current.send(
      JSON.stringify({
        type: "message",
        id: data.key,
        device1: checked ? 1 : 0
      })
    );
    enable3.current = true;
    // set Disable Switch for 1 second
  };
  const onChangeDevice2 = (checked) => {
    console.log(`switch to ${checked}`);
    websocket.current.send(
      JSON.stringify({
        type: "message",
        id: data.key,
        device2: checked ? 1 : 0
      })
    );
    enable4.current = true;
  };

  return (
    <div
      className="col-auto"
      style={{
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #e8eaed69)"
      }}
    >
      <div className="top-hut">
        <div className="head-bar pt-5 d-flex justify-content-between">
          <Divider orientation="left" orientationMargin="0">
            <span className="text-uppercase fw-bold fs-4">
              Tên thiết bị: <span className="">{data?.name}</span>
            </span>
          </Divider>
        </div>
        <div className="badge-button mt-3 d-flex ">
          <button className="btn btn-outline-secondary btn-sm me-3">
            Trạng thái hoạt động:
            <span className="badge">
              {stateDevice ? (
                <Space direction="vertical">
                  <Badge status="processing" text="Đang hoạt động" />
                </Space>
              ) : (
                <Badge status="warning" text="Không hoạt động" />
              )}
            </span>
          </button>

          <button className="btn btn-outline-secondary  btn-sm">
            Mã liên kết: <span className="badge text-bg-secondary">{data?.key}</span>
          </button>
        </div>
      </div>
      <Card
        className="my-3 add-padding"
        style={{ backgroundColor: "rgb(240 242 245)", height: "790px", maxHeight: "800px" }}
      >
        <div className="control-board">
          {" "}
          <Row>
            <Col className="m-1" flex={4}>
              <Divider orientation="left" orientationMargin="0">
                <span className="text-uppercase fw-bold fs-6">
                  <RiRemoteControl2Fill className="me-1" />
                  Thiết bị điều khiển
                </span>
              </Divider>
              <Row gutter={16}>
                <Col span={8}>
                  <Card
                    className="no-padding"
                    title={
                      <div>
                        <div>{(data?.device1 || "Loading...").toUpperCase()}</div>
                        <div style={{ fontSize: "0.75rem", color: "grey" }}>Thiết bị - 1</div>
                      </div>
                    }
                    bordered={false}
                    extra={
                      <BiRadioCircle
                        style={{
                          fontSize: "2rem",
                          color: currentData?.device1 === 1 ? "green" : "gray"
                        }}
                      />
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <span>Trạng thái điều khiển:</span>
                      <Switch checked={currentData?.device1 === 1} onChange={onChangeDevice1} disabled={!stateDevice} />
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className="no-padding"
                    title={
                      <div>
                        <div>{(data?.device2 || "Loading...").toUpperCase()}</div>
                        <div style={{ fontSize: "0.75rem", color: "grey" }}>Thiết bị - 2</div>
                      </div>
                    }
                    bordered={false}
                    extra={
                      <BiRadioCircle
                        style={{ fontSize: "2rem", color: currentData?.device2 === 1 ? "green" : "gray" }}
                      />
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <span>Trạng thái điều khiển:</span>
                      <Switch checked={currentData?.device2 === 1} onChange={onChangeDevice2} disabled={!stateDevice} />
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className="no-padding"
                    title={
                      <div>
                        <div>{(data?.device3 || "Loading...").toUpperCase()}</div>
                        <div style={{ fontSize: "0.75rem", color: "grey" }}>Thiết bị - 3</div>
                      </div>
                    }
                    bordered={false}
                    extra={
                      <BiRadioCircle
                        style={{ fontSize: "2rem", color: currentData?.device3 === 1 ? "green" : "gray" }}
                      />
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <span>Trạng thái thiết bị:</span>
                      <Switch checked={currentData?.device3 === 1} disabled />
                    </div>
                  </Card>
                </Col>
              </Row>
              <Divider orientation="left" orientationMargin="0">
                <span className="text-uppercase fw-bold fs-6">
                  <BsSpeedometer2 className="me-1" />
                  Thiết bị cảm biến
                </span>
              </Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    className="no-padding"
                    title={
                      <div>
                        <div>{(data?.device5 || "Loading...").toUpperCase()}</div>
                        <div style={{ fontSize: "0.75rem", color: "grey" }}>Thiết bị - 5</div>
                      </div>
                    }
                    bordered={false}
                    extra={
                      <BiRadioCircle
                        style={{ fontSize: "2rem", color: currentData?.device5 === 1 ? "green" : "gray" }}
                      />
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <span>Trạng thái thiết bị:</span>
                      <Switch checked={currentData?.device5 === 1} disabled />
                    </div>
                  </Card>
                  <Card
                    className="no-padding mt-3"
                    title={
                      <div>
                        <div>{(data?.device6 || "Loading...").toUpperCase()}</div>
                        <div style={{ fontSize: "0.75rem", color: "grey" }}>Thiết bị - 6</div>
                      </div>
                    }
                    bordered={false}
                    extra={
                      <BiRadioCircle
                        style={{ fontSize: "2rem", color: currentData?.device6 === 1 ? "green" : "gray" }}
                      />
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <span>Trạng thái thiết bị:</span>
                      <Switch checked={currentData?.device6 === 1} disabled />
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <h3>
                      {data?.device4.label}: {currentData?.device4} C
                    </h3>
                    {data?.device4?.Chart === 0 ? (
                      <Temperature value={currentData?.device4 ? currentData?.device4 : 0} height={350} />
                    ) : (
                      <PM value={currentData?.device4 ? currentData?.device4 : 0} />
                    )}
                  </Card>
                </Col>
              </Row>
            </Col>
            <Divider type="vertical" style={{ height: "auto" }} />
            <Col flex={2}>
              <Divider orientation="left" orientationMargin="0">
                <span className="text-uppercase fw-bold fs-6">
                  <IoClipboardOutline className="me-1" />
                  Dữ liệu môi trường
                </span>
              </Divider>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
