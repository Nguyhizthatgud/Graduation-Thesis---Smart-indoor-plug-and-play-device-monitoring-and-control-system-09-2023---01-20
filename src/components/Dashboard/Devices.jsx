import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Breadcrumb } from "antd";
import { Divider, Button } from "antd";
import { Input, Tree } from "antd";
import { Alert, Flex, Spin, Space, Card } from "antd";
import { Table } from "antd";
import { LuLocateFixed } from "react-icons/lu";
import { parseISO, format } from "date-fns";
import WeatherIconIndicate from "./WeatherIconIndicate";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import axios from "axios";
const { Search } = Input;

function Devices() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("Thanh%20pho%20Ho%20Chi%20Minh,vn");

  const data = weatherData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=731cab9135db147dc33054ebc855d064&lang=vi&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [location]); // Fetch data whenever location changes
  //handle onSearch button click to search location
  const handleSearch = (value) => {
    setLocation(value);
    setSearchValue("");
  };
  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=731cab9135db147dc33054ebc855d064&lang=vi&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setWeatherData(data);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const temperatureData = data?.list.map((item, index) => ({
    time: new Date(item.dt_txt).toLocaleTimeString(),
    "Độ ẩm theo ngày": item.main.humidity,
    "Nhiệt độ theo ngày": item.main.temp,
    "Áp suất không khí": item.main.pressure,
  }));
  const Tooltiplabel = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
        >
          <p>{`${label}`}</p>
          <p
            className="label"
            style={{ color: payload[1].color }}
          >{`Độ ẩm theo ngày: ${payload[1].value}%`}</p>
          <p
            className="label"
            style={{ color: payload[0].color }}
          >{`Nhiệt độ theo ngày: ${payload[0].value}°C`}</p>
        </div>
      );
    }

    return null;
  };
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
      <div className="d-flex justify-content-between ">
        <Breadcrumb
          className="pt-2"
          items={[
            {
              title: <a href="">Dữ liệu </a>,
            },
            {
              title: <a href="">Bảng biểu</a>,
            },
          ]}
        />
        <div>
          <Search
            placeholder="Địa điểm..."
            onSearch={handleSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            style={{ width: 200 }}
          />

          <Button className="ms-2" size="sm" onClick={handleButtonClick}>
            <LuLocateFixed />
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <div className="">
          <div className="pt-2">
            <Card
              hoverable
              title={
                <div className="d-flex justify-content-between">
                  <span className="fw-bold fs-5">Thời tiết</span>
                  <span className="fw-bold fs-5">
                    {data?.list[0].dt_txt.split(" ")[0]}
                  </span>
                </div>
              }
              className="text-wrap"
              size="small"
              style={{ paddingTop: "0.5rem" }}
            >
              <div className="d-flex flex-column">
                <span className="fw-italic fs-5">
                  {data?.city.name}, {data?.city.country}
                </span>
                <div className="d-flex flex-row">
                  <span className="fw-bold h1 d-inline-block">
                    {data?.list[0].main.temp}°C{" "}
                  </span>
                  <span className="h4 d-flex align-items-center">
                    ,{data?.list[0].weather[0].description}
                  </span>
                </div>
                <div>
                  <WeatherIconIndicate icon={data?.list[0].weather[0].icon} />
                </div>
              </div>
              <div className="d-flex flex-column align-items-start">
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  style={{
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                    position: "relative",
                    left: "-1.25rem",
                  }}
                >
                  <LineChart data={temperatureData} margin={{}}>
                    <CartesianGrid strokeDasharray="7 7" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={<Tooltiplabel />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Nhiệt độ theo ngày"
                      stroke="#82ca9d"
                      activeDot={{ r: 3 }}
                      activeOpacity={1}
                    />
                    <Line
                      type="monotone"
                      dataKey="Độ ẩm theo ngày"
                      stroke="#8884d8"
                      activeDot={{ r: 3 }}
                      activeOpacity={1}
                    />
                    <Area
                      type="monotone"
                      dataKey="Áp suất không khí"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Devices;
