import React, { useRef, useMemo, useState, useContext, useEffect } from "react";
import * as faceapi from 'face-api.js'
import { Col, Divider, Row } from "antd";
import { Button, Form, Input, InputNumber, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UserContext } from "../context/ContextProvider";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";

// use context set value for context
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import instance from "./services/axios";
import "react-toastify/dist/ReactToastify.css";
import "./Loginform.scss";
import { Alert, Space } from 'antd';
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

function FaceIdPage() {
  // use context set value for context
  const userContext = useContext(UserContext);
  const toastId = useRef(null);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [image, setImage] = useState(null); // [1]
  const videoHeight = 250;
  const videoWidth = 250;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamConstraints = {
    video: true

  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]).then(mediaStreamConstraints);

    }
    loadModels();
  }, []);

  const onMediaSuccess = (stream) => {
    videoRef.current.srcObject = stream;
  };
  const onMediaError = (error) => {
    console.error("media error", error);
  };
  useMemo(() => {
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(onMediaSuccess).catch(onMediaError);
  }, []);
  const handleSubmit = async () => {
    // create form data
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const dataURI = canvas.toDataURL("image/jpeg");
    // convert to image to send formdata to server
    const image = new Image();
    image.src = dataURI;
    setImage(image);
    const formData = new FormData();
    // convert base64 to file
    const file = dataURLtoFile(image.src, "image.jpg");
    // gen new toast and update

    formData.append("images", file);
    try {
      // react toastify chain
      setLoading(true);
      const response = await instance.post("/loginWithImage", formData);
      // show toast
      toast.success("Login success", {
        autoClose: 2000,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true
      });
      setTimeout(() => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.message));
          userContext.setUser(response.data.message);
          setLoading(false);
          handleReset();
        } else {
          handleReset();
        }
      }, 5000);
    } catch (error) {
      toast.error(
        "User not found" ? "Không tìm thấy dữ liệu phù hợp" : "Đăng nhập không thành công",
        {
          autoClose: 2000,
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true
        });
      setTimeout(() => {
        setLoading(false);
        handleReset();
      }, 2000);
    }
    // wait 1s
  };
  const handleVideoOnPlaying = () => {
    //detect the faces in the video frame by using Tiny Face Detector to find all the faces present in the image and then using the
    //setInterval to draw the frame
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions).withFaceLandmarks();
      const displaySize = { width: videoWidth, height: videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resizeDectections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizeDectections);
      //faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDectections);
      // console.log(detections)
    }, 500)
  }
  const handleReset = () => {
    setImage(null);
    // reset video
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(onMediaSuccess).catch(onMediaError);
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
                  <h3 className="ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1">Sign-In</h3>
                  <Space style={{ width: '100%', paddingLeft: '4rem' }}>
                    {initializing ? <Alert
                      message="Camera đã bật"
                      type="success"
                      showIcon
                    /> : <Alert
                      message="Vui Lòng định vị gương mặt khi đang kiểm tra dữ liệu ahihi."
                      type="info"
                      showIcon
                    />}
                  </Space>
                  <div

                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <video ref={videoRef} autoPlay muted onPlay={handleVideoOnPlaying} style={{ width: 300, height: 300 }} />
                    <canvas ref={canvasRef} height={videoHeight} width={videoWidth} className='position-absolute ' />
                    <Button type="primary" onClick={handleSubmit} disabled={loading === true ? true : false}>
                      {
                        loading === true ? (
                          <LoadingOutlined />
                        ) : (
                          "Login"
                        )
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceIdPage;
