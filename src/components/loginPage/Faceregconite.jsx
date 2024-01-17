import React, { useEffect, useState, useRef, useMemo } from 'react'
import * as faceapi from 'face-api.js'
import { Button, Checkbox, Form, Input, Flex, Segmented } from "antd";
import Webcam from 'react-webcam';
import CatchImages from './CatchImages';

import './Faceregconite.scss'
function Faceregconite({ catchImages }) {
    const videoHeight = 480;
    const videoWidth = 640;
    const [initializing, setInitializing] = useState(false);
    const video = useRef();
    const canvas = useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            setInitializing(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            ]).then(startVideo);

        }
        loadModels();
    }, []);
    //start a vieo
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then((stream) => {
                video.current.srcObject = stream;
            });
    }
    //handleVideoOnplay
    const handleVideoOnPlaying = () => {


        //detect the faces in the video frame by using Tiny Face Detector to find all the faces present in the image and then using the
        //setInterval to draw the frame
        setInterval(async () => {
            if (initializing) {
                setInitializing(false);

            }
            canvas.current.innerHTML = faceapi.createCanvasFromMedia(video.current);
            const detections = await faceapi.detectAllFaces(video.current, new faceapi.TinyFaceDetectorOptions).withFaceLandmarks();
            const displaySize = { width: videoWidth, height: videoHeight };
            const resizeDectections = faceapi.resizeResults(detections, displaySize);
            canvas.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvas.current, resizeDectections);
            // faceapi.draw.drawFaceLandmarks(canvas.current, resizeDectections);
            // console.log(detections)
        }, 100)
    }


    // take a photo



    return (
        <div>
            <span>{initializing ? 'Camera is On!' : 'Vui Lòng định vị gương mặt khi đang thêm dữ liệu'}</span>
            <div className='d-flex justify-content-center'>

                <video ref={video} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlaying} />
                <canvas ref={canvas} height={videoHeight} width={videoWidth} className='position-absolute' />
            </div>
         

        </div>
    );
}

export default Faceregconite;





