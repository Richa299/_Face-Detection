import * as faceapi from "face-api.js";
import { useEffect, useRef } from 'react';
import './Main.css';
function Main(props) {
    
  const imageRef=useRef();
  const canvasRef=useRef();

  const handleImg= async()=>{
    
    const detections=await faceapi.detectAllFaces(imageRef.current,
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      
      canvasRef.current.innerHtml=faceapi.createCanvasFromMedia(imageRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 795,
        height: 460
      })
       const  resized=faceapi.resizeResults(detections,{
        width: 795,
        height: 460
       })
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      
  }
  useEffect(()=>{
  const loadModels=()=>{
  Promise.all([
  
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models")
    
  ]).then(handleImg)
  .catch(e=>(console.log(e)))
  }

  loadModels()
  
},[props.src])

  return (
    <div className="Main"> 
    <div className="img">
    <img crossOrigin="anonymous" ref={imageRef} src={props.src}/>
     
     <canvas ref={canvasRef} width="795"
     height="460"/>
    </div>
      

    </div>
    
  );
}

export default Main;
