import React, { useMemo, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Breadcrumb } from "antd";
import { Divider } from "antd";
import { Input, Tree } from "antd";
import { Table } from "antd";

const { Search } = Input;

const initTreeData = [
  {
    title: "Expand to load",
    key: "0",
  },
  {
    title: "Expand to load",
    key: "1",
  },
  {
    title: "Tree Node",
    key: "2",
    isLeaf: true,
  },
];

const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
function Devices({ data }) {
  const [treeData, setTreeData] = useState(initTreeData);
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Thanh%20pho%20Ho%20Chi%20Minh,vn&APPID=731cab9135db147dc33054ebc855d064&cnt=56"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data.list);
      });
  }, []);
  return (
    <div
      className="devices col"
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(to right, hsl(0deg 0% 91.37%),hsl(0deg 0% 78.43%))",
      }}
    >
      <div className="head-bar pt-5 d-flex justify-content-between">
        <Divider orientation="left" orientationMargin="0">
          <span className="text-uppercase fw-bold fs-4">Môi Trường</span>
        </Divider>
      </div>
      <Breadcrumb
        className="pt-2"
        items={[
          {
            title: <a href="#data">Dữ liệu </a>,
          },
          {
            title: <a href="datatable">Bảng biểu</a>,
          },
        ]}
      />
      <div className="pt-4">
        <Table bordered title={() => "Bảng dữ liệu thiết bị"} />
      </div>
      <div>
        {/* Rest of your code */}
        {/* {weatherData.map((data, index) => (
          <div key={index}>
            <p>Temperature: {data.temperature}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Devices;
