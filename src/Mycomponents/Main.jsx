import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from 'react';
import './Main.css';
function Main(props) {
    
    function handleClick(e){
        console.log("hi")
    }
  const imageRef=useRef();
  const canvasRef=useRef();

  const handleImg= async()=>{
    
    const detections=await faceapi.detectAllFaces(imageRef.current,
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
     
      console.log(canvasRef.current);
      
      canvasRef.current.innerHtml=faceapi.createCanvasFromMedia(imageRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 700,
        height: 400
      })
       const  resized=faceapi.resizeResults(detections,{
        width: 700,
        height: 400
       })
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      
  }
  useEffect(()=>{
  const loadModels=()=>{
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models")
    
  ]).then(handleImg)
  .catch(console.log("false"))
  }

  imageRef.current && loadModels()
  
},[props.src])

  return (
    <div className="Main"> 
    
    <div className="img">
    <img ref={imageRef} src={props.src}/>
     
     <canvas ref={canvasRef} width="700"
     height="400"/>
    </div>
      

    </div>
    
  );
}

export default Main;
