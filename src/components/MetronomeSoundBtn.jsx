import React, { useEffect, useRef, useState } from "react";
import "./MetronomeSoundBtn.css";
const MetronomeSoundBtn = ({play,playing}) => {
  const [mode, setMode] = useState(1);
  const beat1 = useRef(null);
  const beat2 = useRef(null);
  const beat3 = useRef(null);

  useEffect(() => {
    if (play) {
      if (mode !== 0) {

        if (mode === 1) {
          if (beat1.current) {
            beat1.current.currentTime = 0;
            beat1.current.play();
          }
        } 
        
        else if(mode===2){
          if (beat2.current) {
            beat2.current.currentTime = 0;
            beat2.current.play();
          }
        }

        else{
          if (beat3.current) {
          beat3.current.currentTime = 0;
          beat3.current.play();
        }
      }
    }
    }}, [play, mode]);


  return (
    <div
      id="MetronomeSoundBtn"
      className={`${
        mode === 0 ? "mode0" : mode === 1 ? "mode1" : mode === 3 ? "mode3" : "mode2"
      } ${play ? "btnPlaying" : ""}`}
      
      onClick={() => {
        let m = (mode + 1) % 4;
        setMode(m);
        if(!playing){
          if(m===1){
            beat1.current.currentTime = 0;
            beat1.current.play();
          }
          else if(m===2){
            beat2.current.currentTime = 0;
            beat2.current.play();
          }
          else if(m===3){
            beat3.current.currentTime = 0;
            beat3.current.play();
          }
        }
      }}
    >
      <audio ref={beat1} src="src\assets\sound_a\a1.mp3"></audio>
      <audio ref={beat2} src="src\assets\sound_a\a2.mp3"></audio>
      <audio ref={beat3} src="src\assets\sound_a\a3.wav"></audio>
    </div>
  );
};

export default MetronomeSoundBtn;
