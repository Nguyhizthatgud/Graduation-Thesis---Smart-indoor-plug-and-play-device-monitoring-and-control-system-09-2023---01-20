import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Information.scss";
import instance from "../services/axios";
function Information() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataroom, dataroomchange] = useState(null);
  const [data, setData] = useState(null);
  const [active, setActive] = useState(0);
  const websocket = React.useRef(null);
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);
  useEffect(() => {
    const getAllKey = async () => {
      websocket.current = new WebSocket("ws://206.189.40.229:8120");
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
            dataroomchange(
              res.data.map((item) => {
                return {
                  ...item,
                  isActive: false
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
                      isActive: true
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
  // Check if data is defined and is an array before accessing its length
  const dataLength = data && Array.isArray(data) ? data.length : 0;
  return (
    <div className=" col-md-2 col-lg-3 col-ms-1  d-flex flex-column flex-nowrap bg-warning-subtle border-end position-relative">
      <h2 className="filer-listname h3 p-0 mt-lg-4 mt-md-3 mb-1 fw-semibold">
        Bảng <span className="text-warning text-opacity-75">điều khiển</span>
      </h2>
      <div className="filer-list d-flex flex-column">
        <div className="search-filerbox g-4 pt-5 d-flex flex-column">
          <div className="devices">
            <div className="devices-box d-flex justify-content-between">
              <i class="bi bi-box p-2 ">
                <span className="p-2 fs-md-4 fs-ms-2 text-warning-emphasis fw-bold">Thiết bị</span>
              </i>
              <i className="bi bi-search p-2" role="button"></i>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Số lượng Thiết bị</div>
              <div>{dataLength}</div>
            </div>
          </div>
        </div>
        <div className="search-filerbox g-4 pt-1 d-flex flex-column">
          <div className="devices">
            <div className="devices-box d-flex justify-content-between">
              <i class="bi bi-geo p-2 ">
                <span className="p-2 text-warning-emphasis fw-bold">Vị trí</span>
              </i>
              <i className="bi bi-search p-2" role="button"></i>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Vị trí hoạt động</div>
              <div>{data && Array.isArray(data) ? data.length * 6 : 0}</div>
            </div>
          </div>
        </div>
        <div className="search-filerbox g-4 pt-1 d-flex flex-column">
          <div className="devices">
            <div className="devices-box d-flex justify-content-between">
              <i class="bi bi-person-badge p-2 ">
                <span className="p-2 fw-bold text-warning-emphasis">Người dùng</span>
              </i>
              <i className="bi bi-search p-2" role="button"></i>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Tên :</div>
              <div>{JSON.parse(localStorage.getItem("user")).username}</div>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Email:</div>
              <div>{JSON.parse(localStorage.getItem("user")).email}</div>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>So dien thoai :</div>
              <div>{JSON.parse(localStorage.getItem("user")).phoneNumber}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <p className="flex-grow-1 position-absolute bottom-0 start-0 mx-3 fw-semibold">
          {currentTime.toLocaleDateString()}
        </p>
        <p className="position-absolute bottom-0 end-0 mx-3 fw-semibold">{currentTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default Information;
