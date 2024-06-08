import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Breadcrumb } from "antd";
import { Divider, Button } from "antd";
import { Input, Flex } from "antd";
import { Col, Row, Space, Card } from "antd";
import { Table } from "antd";
import { LuLocateFixed } from "react-icons/lu";
import { parseISO, format } from "date-fns";
import WeatherIconIndicate from "./WeatherIconIndicate";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import L from "leaflet";
import "./Devices.scss";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import axios from "axios";
const { Search } = Input;

function Devices() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("Thanh%20pho%20Ho%20Chi%20Minh,vn");
  const [layer, setLayer] = useState("temp_new");
  const mapRef = useRef(null);
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
  //fetch Weather maps from OpenWeatherMap
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [51.505, -0.09], // Set this to the center of your map
        zoom: 13,
      });

      L.tileLayer(
        `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid={apiKey}`,
        {
          // Change this to the type of weather data you want
          apiKey: "731cab9135db147dc33054ebc855d064", // Your OpenWeatherMap API key
          attribution:
            '&copy; <a href="https://www.openweathermap.org/">OpenWeatherMap</a>',
          maxZoom: 19,
        }
      ).addTo(mapRef.current);
    }
  }, []);
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
    // Format the date and timestamp to be more readable in the chart,
    time: format(parseISO(item.dt_txt), "HH:mm dd/MM/yyyy"),
    "Độ ẩm theo ngày": item.main.humidity,
    "Nhiệt độ theo ngày": item.main.temp,
    "Áp suất không khí": item.main.pressure,
    "Lượng Mưa": item?.rain?.["3h"] || 0,
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
          <p className="label" style={{ color: payload[2].color }}>
            {`Lượng mưa: ${payload[2].value} mm/h`}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div
      className="devices col-auto"
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
              title: <a href="">Thời tiết</a>,
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
          <div className="w-100">
            <Card
              hoverable
              title={
                <div className="d-flex justify-content-between">
                  <span className="fst-italic fs-5">
                    Thời tiết: {data?.city.name}, {data?.city.country}
                  </span>
                  <span className="fw-bold fs-5">
                    {data?.list[0].dt_txt.split(" ")[0]}
                  </span>
                </div>
              }
              className="text-wrap"
              size="small"
              style={{
                backgroundColor: "rgb(165 165 165)",
              }}
            >
              <div className="d-flex flex-col">
                <div className="d-flex flex-row">
                  <span className="fw-bold h2 d-inline-block">
                    {data?.list[0].main.temp}°C{" "}
                  </span>
                  <span className="h4 d-flex align-items-center">
                    ,{data?.list[0].weather[0].description}
                  </span>
                </div>
                <div>
                  <WeatherIconIndicate icon={data?.list[0].weather[0].icon} />
                </div>
                <span className="fw-bold">
                  Vĩ độ {data?.city.coord?.lat}
                  <TbWorldLatitude />
                </span>
                <span className="fw-bold">
                  Kinh độ {data?.city.coord?.lon}
                  <TbWorldLongitude />
                </span>
                <span></span>
              </div>
              <div>
                <div className="d-flex flex-row">
                  <span>Độ ẩm {data?.list[0].main.humidity}%</span>
                  <span className="fw-bold">Áp suất không khí </span>
                  <span> {data?.list[0].main.pressure} hPa</span>
                  <span>Huớng gió</span>
                  <span>{data?.list[0].wind.deg}°</span>
                </div>
              </div>
            </Card>
            <Row gutter={16} className="flex flex-wrap" style={{}}>
              <Col className="" span={10}>
                <div className="">
                  <Card
                    hoverable
                    title="Dự báo thời tiết"
                    size="small"
                    className="my-3 d-flex flex-column"
                    style={{ overflow: "auto" }}
                  >
                    <Table
                      className="max-h-100 overflow-y-auto"
                      sticky
                      pagination={true}
                      style={{ whiteSpace: "wrap", wordWrap: "break-word" }}
                      scroll={{ y: "calc(100vh - 57vh)" }}
                      columns={[
                        {
                          title: "Thời gian",
                          dataIndex: "time",
                          key: "time",
                          render: (text) => (
                            <span>
                              {format(parseISO(text), "HH:mm dd/MM/yyyy")}
                            </span>
                          ),
                        },
                        {
                          title: "Nhiệt độ",
                          dataIndex: "temp",
                          key: "temp",
                          render: (text) => <span>{text}°C</span>,
                        },
                        {
                          title: "Độ ẩm",
                          dataIndex: "humidity",
                          key: "humidity",
                          render: (text) => <span>{text}%</span>,
                        },
                        {
                          title: "Mô tả",
                          dataIndex: "description",
                          key: "description",
                        },
                      ]}
                      dataSource={data?.list.map((item, index) => ({
                        key: index,
                        time: item.dt_txt,
                        temp: item.main.temp,
                        humidity: item.main.humidity,
                        description: item.weather[0].description,
                      }))}
                    />
                  </Card>
                </div>
              </Col>
              <Col className="mt-3" span={14}>
                <Card hoverable title="Bảng biểu" className="no-padding">
                  <div className="d-flex flex-row align-items-start">
                    <ResponsiveContainer width="100%" height={220} style={{}}>
                      <ComposedChart
                        height={600}
                        data={temperatureData}
                        margin={{ top: 10 }}
                      >
                        <CartesianGrid strokeDasharray="7 7" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          label={{
                            value: "mm/h",
                            angle: 0,
                            position: "insideTop",
                          }}
                        />
                        <Tooltip content={<Tooltiplabel />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Nhiệt độ theo ngày"
                          stroke="#82ca9d"
                          activeDot={{ r: 3 }}
                          activeOpacity={1}
                          yAxisId="left"
                        />
                        <Line
                          type="monotone"
                          dataKey="Độ ẩm theo ngày"
                          stroke="#8884d8"
                          activeDot={{ r: 3 }}
                          activeOpacity={1}
                          yAxisId="left"
                        />
                        <Bar
                          dataKey="Lượng Mưa"
                          fill="#413ea0"
                          yAxisId="right"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                <Card className="my-3 map-card" hoverable title="Bản đồ">
                  <div id="map" style={{ height: "100%", width: "100%" }}></div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices;
