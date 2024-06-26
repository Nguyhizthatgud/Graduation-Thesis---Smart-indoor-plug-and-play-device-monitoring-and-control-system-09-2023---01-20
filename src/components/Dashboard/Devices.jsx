import React, { useState, useEffect, useRef } from "react";

import { Breadcrumb } from "antd";
import { Divider, Button } from "antd";
import { Input, Spin } from "antd";
import { Col, Row, Space, Card } from "antd";
import { Table } from "antd";
import { LuLocateFixed } from "react-icons/lu";
import { parseISO, format, fromUnixTime } from "date-fns";
import WeatherIconIndicate from "./WeatherIconIndicate";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import "./Devices.scss";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { ResponsiveContainer } from "recharts";
import axios from "axios";
const { Search } = Input;

function Devices() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("Thanh%20pho%20Ho%20Chi%20Minh,vn");
  const [airPollutionData, setAirPollutionData] = useState(null); // [1
  const [isLoading, setIsLoading] = useState(false);

  const data = weatherData;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=731cab9135db147dc33054ebc855d064&lang=vi&units=metric`
        );
        setIsLoading(false);
        setWeatherData(response.data);
        console.log(data);
        const airPollutionResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.city.coord.lat}&lon=${response.data.city.coord.lon}&appid=731cab9135db147dc33054ebc855d064`
        );
        setAirPollutionData(airPollutionResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]); // Fetch data whenever location changes
  //fetch air pollution data from openweathermap api
  const fetchAirPollutionData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=731cab9135db147dc33054ebc855d064`
      );
      setAirPollutionData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch air pollution data:", error);
    }
  };

  //handle onSearch button click to search location
  const handleSearch = (value) => {
    setLocation(value);
    setSearchValue("");
  };
  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchAirPollutionData(latitude, longitude);
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=731cab9135db147dc33054ebc855d064&lang=vi&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            setWeatherData(data);
            console.log(data);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const airdata = airPollutionData?.list.map((item, index) => ({
    key: index,
    aqi: item.main.aqi,
    CO: item.components.co,
    "SO₂": item.components.so2,
    "NO₂": item.components.no2,
    "O₃": item.components.o3,
    "pm2.5": item.components.pm2_5,
    pm10: item.components.pm10
  }));
  const temperatureData = data?.list.map((item, index) => ({
    // Format the date and timestamp to be more readable in the chart,
    time: format(parseISO(item.dt_txt), "HH:mm dd/MM/yyyy"),
    "Độ ẩm theo ngày": item.main.humidity,
    "Nhiệt độ theo ngày": item.main.temp,
    "Áp suất không khí": item.main.pressure,
    "Lượng Mưa": item?.rain?.["3h"] || 0
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
            borderRadius: "0.5rem"
          }}
        >
          <p>{`${label}`}</p>
          <p className="label" style={{ color: payload[1].color }}>{`Độ ẩm theo ngày: ${payload[1].value}%`}</p>
          <p className="label" style={{ color: payload[0].color }}>{`Nhiệt độ theo ngày: ${payload[0].value}°C`}</p>
          <p className="label" style={{ color: payload[2].color }}>
            {`Lượng mưa: ${payload[2].value} mm/h`}
          </p>
        </div>
      );
    }
    return null;
  };
  //tooltip for air pollution data
  const Airtooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "0.1rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem"
          }}
        >
          <p className="label" style={{ color: payload[0].color }}>{`Carbon Monoxide: ${payload[0].value} µg/m³`}</p>
          <p className="label" style={{ color: payload[1].color }}>{`Sulfur Dioxide: ${payload[1].value} µg/m³`}</p>
          <p className="label" style={{ color: payload[2].color }}>{`Nitrogen dioxide: ${payload[2].value} µg/m³`}</p>
          <p className="label" style={{ color: payload[3].color }}>{`Ozone: ${payload[3].value} µg/m³`}</p>
          <p className="label" style={{ color: payload[4].color }}>{`Bụi mịn 2.5: ${payload[4].value} µg/m³`}</p>
          <p className="label" style={{ color: payload[5].color }}>{`Bụi mịn 10: ${payload[5].value} µg/m³`}</p>
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
        backgroundImage: "linear-gradient(to right, #e8eaed69)"
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
              title: <a href="">Thời tiết</a>
            },
            {
              title: <a href="">Biều đồ</a>
            }
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
      {isLoading ? (
        <Spin
          size="large"
          title="Đang tải"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
        />
      ) : (
        <div className="pt-4">
          <div className="">
            <div className="w-100">
              <Card
                hoverable
                title={
                  <div className="d-flex justify-content-between">
                    <span className="fst-italic fs-5">
                      Thời tiết: {data?.city.name}, {data?.city.country}
                      <span className="h6">
                        (Vĩ độ {data?.city.coord?.lat}
                        {"  "}
                        <TbWorldLatitude /> - Kinh độ {data?.city.coord?.lon} {"  "}
                        <TbWorldLongitude />)
                      </span>
                    </span>
                    <span className="fw-bold fs-5">{data?.list[0].dt_txt.split(" ")[0]}</span>
                  </div>
                }
                className="text-wrap"
                size="small"
                style={{
                  backgroundColor: "rgb(207 213 221)"
                }}
              >
                <div className="d-flex flex-col justify-content-between">
                  <div className="d-flex flex-row">
                    <span className="fw-bold h2 d-inline-block">{data?.list[1].main.temp}°C </span>
                    <span className="h6 d-flex align-items-center">,{data?.list[1].weather[0].description},</span>
                    <div>
                      <WeatherIconIndicate icon={data?.list[1].weather[0].icon} />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <span className="h6  d-flex  align-items-center">
                      mức nhiệt cao nhất: {data?.list[1].main.feels_like}°C ({data?.list[1].main.temp_max}°↑,{" "}
                      {data?.list[1].main.temp_min}°↓ )
                    </span>
                  </div>
                </div>
                <div>
                  <Row className="d-flex justify-content-between">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Độ ẩm</span>
                      <div>{data?.list[1].main.humidity}%</div>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Áp suất không khí</span>
                      <div>{data?.list[1].main.pressure} hPa</div>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Khả năng mưa</span>
                      <div>{data?.list[1].pop * 100}%</div>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Tốc độ gió</span>
                      <div>{data?.list[1].wind.speed} m/s</div>
                    </Col>
                    <Col ClassName="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Độ phủ mây</span>
                      <div className="text-center">{data?.list[1].clouds.all}%</div>
                    </Col>

                    <Col ClassName="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Mặt trời mọc</span>
                      <div className="text-center">{format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")}</div>
                    </Col>
                    <Col ClassName="d-flex flex-column justify-content-center align-items-center">
                      <span className="fw-bold">Mặt trời lặn</span>
                      <div className="text-center">{format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}</div>
                    </Col>
                  </Row>
                </div>
              </Card>

              <Row gutter={16} className="flex no-padding" style={{}}>
                <Col className="" span={10}>
                  <div className="">
                    <Card
                      hoverable
                      title="Dự báo thời tiết"
                      className="my-3 d-flex flex-column"
                      style={{ msOverflowY: "auto" }}
                    >
                      <Table
                        className="max-h-100 overflow-y-auto"
                        sticky
                        pagination={true}
                        style={{ whiteSpace: "wrap", wordWrap: "break-word" }}
                        scroll={{ y: "calc(45vh)" }}
                        columns={[
                          {
                            title: "Thời gian",
                            dataIndex: "time",
                            key: "time",
                            render: (text) => <span>{format(parseISO(text), "HH:mm dd/MM/yyyy")}</span>
                          },
                          {
                            title: "Nhiệt độ",
                            dataIndex: "temp",
                            key: "temp",
                            render: (text) => <span>{text}°C</span>
                          },
                          {
                            title: "Độ ẩm",
                            dataIndex: "humidity",
                            key: "humidity",
                            render: (text) => <span>{text}%</span>
                          },
                          {
                            title: "Mô tả",
                            dataIndex: "description",
                            key: "description",
                            render: (text, record) => (
                              <div>
                                <img src={`http://openweathermap.org/img/w/${record.icon}.png`} alt="weather icon" />
                                <br />
                                <span className="h6">{text}</span>
                              </div>
                            )
                          }
                        ]}
                        dataSource={data?.list.map((item, index) => ({
                          key: index,
                          time: item.dt_txt,
                          temp: item.main.temp,
                          humidity: item.main.humidity,
                          description: item.weather[0].description,
                          icon: item.weather[0].icon
                        }))}
                      />
                    </Card>
                  </div>
                </Col>
                <Col className="mt-3" flex span={14}>
                  <Row>
                    <Col span={24}>
                      <Card
                        hoverable
                        title="Biều đồ tương quan"
                        className="no-padding"
                        style={{
                          maxHeight: "345px"
                        }}
                      >
                        <ResponsiveContainer height={245}>
                          <ComposedChart data={temperatureData} margin={{ top: 10 }}>
                            <CartesianGrid strokeDasharray="7 7" />
                            <XAxis dataKey="time" />
                            <YAxis yAxisId="left" />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              label={{
                                value: "mm/h",
                                angle: 0,
                                position: "insideTop"
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
                            <Bar dataKey="Lượng Mưa" fill="#413ea0" yAxisId="right" />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </Card>
                    </Col>
                  </Row>
                  <Row align="stretch">
                    <Col span={24}>
                      <Card
                        style={{ maxHeight: "345px" }}
                        className="mt-3 no-padding "
                        hoverable
                        type="inner"
                        title={
                          <div className="">
                            Chất lượng không khí (AQI):
                            <span className="ms-2">
                              {airPollutionData && airPollutionData.list && airPollutionData.list[0].main.aqi === 1
                                ? "Tốt"
                                : airPollutionData && airPollutionData.list && airPollutionData.list[0].main.aqi === 2
                                ? "Trung bình"
                                : airPollutionData && airPollutionData.list && airPollutionData.list[0].main.aqi === 3
                                ? "Kém"
                                : "Rất kém"}
                            </span>
                          </div>
                        }
                      >
                        <ResponsiveContainer className="AQI" height={245}>
                          <ComposedChart
                            height={600}
                            data={airdata}
                            margin={{ top: 10 }}
                            barGap={70}
                            barCategoryGap="10%"
                          >
                            <CartesianGrid strokeDasharray="3 3 " />
                            <XAxis ticks={["CO", "SO₂", "NO₂", "O₃", "pm2.5", "pm10"]} />
                            <YAxis yAxisId="left" />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              stroke="#8884d8"
                              label={{
                                value: "µg/m³",
                                angle: 0,
                                position: "insideTop"
                              }}
                            />
                            <Tooltip content={<Airtooltip />} />
                            <Legend />
                            <Bar dataKey="CO" fill="#8884d8" yAxisId="right" barSize={30} />

                            <Bar dataKey="SO₂" fill="#82ca9d" yAxisId="right" barSize={30} />
                            <Bar dataKey="NO₂" fill="#ff7300" yAxisId="right" barSize={30} />
                            <Bar dataKey="O₃" fill="#ff0000" yAxisId="right" barSize={30} />

                            <Bar dataKey="pm2.5" fill="#ffc658" yAxisId="right" barSize={30} />
                            <Bar dataKey="pm10" fill="#00ff00" yAxisId="right" barSize={30} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Devices;
