// import React from 'react'
import { useEffect, useState, useRef } from 'react';

// haha oh no this whole this is so busted

export default function Waveform({props}) {
    const [dataArray, setDataArray] = useState();
    const [init, setInit] = useState(false); 
    const canvasRef = useRef(null);
  
    const clear = (context) => {
      context.fillStyle = 'rgb(255, 255, 0)';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  
    const draw = () => {
      if (!dataArray) {
        return;
      }
  
      window.requestAnimationFrame(draw);
      props.analyser.getByteTimeDomainData(dataArray);
  
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      clear(context);
  
      context.lineWidth = 1;
      context.strokeStyle = 'rgb(0, 0, 0)';
      context.beginPath();
  
      const width = context.canvas.width;
      const buffLength = props.analyser.frequencyBinCount;
      const slice = width * 1.0 / buffLength;
      let x = 0;
  
      for (let i = 0; i < buffLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * context.canvas.height/2;
  
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
  
        x += slice;
      }
  
      context.stroke();
    };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      clear(context);
    }, []);
  
    useEffect(() => {
      if(init && dataArray) {
        draw();
      }
    }, [dataArray]);
  
    useEffect(() => {
      const analyser = props.analyser;
      if (!analyser) {
        return;
      }
      if (init) {
        return;
      }
  
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      setDataArray(dataArray);
  
      setInit(true);
    }, [props.analyser]);
  
    return <canvas ref={canvasRef} {...props}/>
  };
