import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// Grid atnd
import { Row, Col, Switch } from "antd";
import { Pie } from "react-chartjs-2";
import { Intensity, PM, Temperature } from "react-environment-chart";
import instance from "./services/axios";
import { Routes, Route, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DetailsPage2() {
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
      websocket.current = new WebSocket("ws://159.223.71.166:8120");
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
              // check prev vs current
              if (data[i].device1 !== prevStatus.device1 && prevStatus.device1 !== null && enable3.current !== true) {
                toast.success(`Device 1 is ${data[i].device1 === 1 ? "On" : "Off"}`);
                prevStatus.device1 = data[i].device1;
              }
              if (data[i].device2 !== prevStatus.device2 && prevStatus.device2 !== null && enable4.current !== true) {
                toast.success(`Device 2 is ${data[i].device2 === 1 ? "On" : "Off"}`);
                prevStatus.device2 = data[i].device2;
              }
              if (data[i].device3 !== prevStatus.device3 && prevStatus.device3 !== null) {
                toast.success(`${res.data?.device3} is ${data[i].device3 === 1 ? "On" : "Off"}`);
                prevStatus.device3 = data[i].device3;
              }
              if (data[i].device5 !== prevStatus.device5 && prevStatus.device5 !== null) {
                toast.success(` ${res.data?.device5} is ${data[i].device5 === 1 ? "On" : "Off"}`);
                prevStatus.device5 = data[i].device5;
              }
              if (data[i].device6 !== prevStatus.device6 && prevStatus.device6 !== null) {
                toast.success(` ${res.data?.device6}  is ${data[i].device6 === 1 ? "On" : "Off"}`);
                prevStatus.device6 = data[i].device6;
              }
              if (prevStatus.device1 === null) {
                prevStatus.device1 = data[i].device1;
              }
              if (prevStatus.device2 === null) {
                prevStatus.device2 = data[i].device2;
              }
              if (prevStatus.device3 === null) {
                prevStatus.device3 = data[i].device3;
              }
              if (prevStatus.device5 === null) {
                prevStatus.device5 = data[i].device5;
              }
              if (prevStatus.device6 === null) {
                prevStatus.device6 = data[i].device6;
              }

              enable4.current = false;
              enable3.current = false;
              setCurrentData(data[i]);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
    };
    getDetailKey();
  }, []);
  const onChangeDevice1 = (checked) => {
    // wait 1 second
    websocket.current.send(JSON.stringify({ type: "message", id: data.key, device1: checked ? 1 : 0 }));
    enable3.current = true;
    // set Disable Switch for 1 second
  };
  const onChangeDevice2 = (checked) => {
    console.log(`switch to ${checked}`);
    websocket.current.send(JSON.stringify({ type: "message", id: data.key, device2: checked ? 1 : 0 }));
    enable4.current = true;
  };
  return (
    <>
      {/* need divine matrix 3x3 */}
      <div className="col ">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            height: "100px"
          }}
        >
          <h1>State of Device {stateDevice ? "On" : "Off"}</h1>
          <h1>Device Id: {data?.key}</h1>
        </div>
        <Row
          style={{
            height: "300px",
            width: "100%"
          }}
        >
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device1}</h3>
            <Switch
              onChange={onChangeDevice1}
              value={currentData?.device1 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={enable || stateDevice ? false : true}
            />
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device2}</h3>
            {/* set Size Switch Bigger */}
            <Switch
              size="large"
              defaultChecked
              onChange={onChangeDevice2}
              value={currentData?.device2 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={enable2 || stateDevice ? false : true}
            />
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device3}</h3>
            <Switch
              value={currentData?.device3 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>
              {data?.device4.label}: {currentData?.device4} C
            </h3>
            {data?.device4?.Chart === 0 ? (
              <Temperature value={currentData?.device4 ? currentData?.device4 : 0} height={350} />
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
              alignItems: "center"
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
              alignItems: "center"
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
    </>
  );
}
