import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Row, Col, Switch, Badge, Divider, Space } from "antd";
import { PM, Temperature } from "react-environment-chart";
import instance from "./services/axios";
import { useParams } from "react-router-dom";
import { message, Layout, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Box from "@mui/material/Box";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DetailsPage2({ Dataroom }) {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [stateDevice, setStateDevice] = useState(false);
  const [enable, setEnable] = useState(false);
  const [enable2, setEnable2] = useState(false);
  const enable3 = React.useRef(false);
  const enable4 = React.useRef(false);
  const websocket = React.useRef(null);

  useEffect(() => {
    const getDetailKey = async () => {
      websocket.current = new WebSocket("ws://157.245.51.60:8120");
      // previous status device
      let prevStatus = {
        device1: null,
        device2: null,
        device3: null,
        device4: null,
        device5: null,
        device6: null,
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
  //a function that Check if the device status has changed and send a ant design success message if it has "1" is on or off

  function checkDeviceStatusAndNotify(
    deviceStatus,
    prevDeviceStatus,
    deviceNum
  ) {
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
        device1: checked ? 1 : 0,
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
        device2: checked ? 1 : 0,
      })
    );
    enable4.current = true;
  };

  return (
    <Layout
      // style={{
      //   height: "100vh",
      //   backgroundColor: "rgba(248, 249, 250, 0.5)",
      //   backgroundImage: `
      //   radial-gradient(rgb(0 0 0 / 20%) 1px, transparent 1px),
      //   radial-gradient(rgb(0 0 0 / 20%) 1px, transparent 1px)`,
      //   backgroundSize: "20px 20px",
      //   backgroundPosition: "0 0, 10px 10px",
      //   backdropFilter: "blur(100px)",
      // }}
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(to right, hsl(0deg 0% 91.37%),hsl(0deg 0% 78.43%))",
      }}
    >
      <div className="container">
        <div className="head-bar pt-5 d-flex justify-content-between">
          <Divider orientation="left" orientationMargin="0">
            <span className="text-uppercase fw-bold fs-4">{data?.name}</span>
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
            Mã liên kết:{" "}
            <span className="badge text-bg-secondary">{data?.key}</span>
          </button>
        </div>
      </div>
      <div className="control-board container">
        {" "}
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
          wrap="true"
        >
          <Row
            style={{
              paddingTop: "20px",
              width: "100%",
              border: "100px #000",
              position: "relative", // Add this line
            }}
          >
            <UserOutlined
              type="user"
              style={{ position: "absolute", top: 0 }}
            />{" "}
            <Col
              span={8}
              style={{
                // center all element in column
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                bordered={true}
                hoverable
                size="small"
                style={{
                  width: 300,
                }}
              >
                <Box
                  //center all element in box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>adasdaea</div>
                  <div>adaseasca</div>
                  <h3>{data?.device1.label}</h3>
                  <Switch
                    value={currentData?.device1 === 1 ? true : false}
                    checkedChildren="Bật"
                    unCheckedChildren="Tắt"
                    onChange={onChangeDevice1}
                  />
                </Box>
              </Card>
            </Col>
            <Col
              span={8}
              style={{
                // center all element
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card>
                <h3>{data?.device2.label}</h3>
                <Switch
                  value={currentData?.device2 === 1 ? true : false}
                  checkedChildren="Bật"
                  unCheckedChildren="Tắt"
                  onChange={onChangeDevice2}
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
      <div>
        khối cảm biến
        <Row>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>
              {data?.device4.label}: {currentData?.device4} C
            </h3>
            {data?.device4?.Chart === 0 ? (
              <Temperature
                value={currentData?.device4 ? currentData?.device4 : 0}
                height={330}
              />
            ) : (
              <PM value={currentData?.device4 ? currentData?.device4 : 0} />
            )}
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>{data?.device5}</h3>
            <Switch
              value={currentData?.device5 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled
            />
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>{data?.device6}</h3>
            <Switch
              value={currentData?.device6 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled
            />
          </Col>
        </Row>
      </div>
      <div>Khối thiết bị</div>
      <div>Khối ví trí</div>
    </Layout>
  );
}
