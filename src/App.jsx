import { useState, useEffect, useRef } from "react";
import "./App.css";
import MetronomeSoundBtn from "./components/MetronomeSoundBtn";
import RandomBox from "./components/RandomBox";
import logo from '/public/BerryMetronomeLogo.jpeg';

function App() {
  const [playing, setPlaying] = useState(false);
  const [beatspb_v, setBeatpb_v] = useState(5);
  const [currentTempo_v, setCurrentTempo_v] = useState(100);
  const [currentTempoName_v, setCurrentTempoName_v] = useState("Larghissimo");
  const [currentBeat, setCurrentBeat] = useState(0);
  const [sound, setSound] = useState("a");
  const [timerDuration, setTimerDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  function handleBeatsPbar_f(e) {
    if (playing) {
      setPlaying(false);
    }
    setBeatpb_v(parseInt(e.target.value, 10));
  }

  useEffect(() => {
    function updateTempoName_f() {
      if (currentTempo_v < 20) setCurrentTempoName_v("Larghissimo");
      else if (currentTempo_v < 40) setCurrentTempoName_v("Grave");
      else if (currentTempo_v >= 40 && currentTempo_v <= 60)
        setCurrentTempoName_v("Lento/Largo");
      else if (currentTempo_v > 60 && currentTempo_v < 66)
        setCurrentTempoName_v("");
      else if (currentTempo_v >= 66 && currentTempo_v <= 76)
        setCurrentTempoName_v("Adagio");
      else if (currentTempo_v > 76 && currentTempo_v <= 80)
        setCurrentTempoName_v("Adagietto");
      else if (currentTempo_v > 80 && currentTempo_v <= 108)
        setCurrentTempoName_v("Andante");
      else if (currentTempo_v > 108 && currentTempo_v <= 120)
        setCurrentTempoName_v("Moderato");
      else if (currentTempo_v > 120 && currentTempo_v <= 168)
        setCurrentTempoName_v("Allegro");
      else if (currentTempo_v > 168 && currentTempo_v <= 176)
        setCurrentTempoName_v("Vivace");
      else if (currentTempo_v > 176 && currentTempo_v <= 200)
        setCurrentTempoName_v("Presto");
      else if (currentTempo_v > 200) setCurrentTempoName_v("Prestissimo");
    }

    updateTempoName_f();
    document.documentElement.style.setProperty("--tempo", currentTempo_v);
  }, [currentTempo_v]);

  useEffect(() => {
    let intervalId;

    if (playing) {
      intervalId = setInterval(() => {
        setCurrentBeat((prevBeat) => (prevBeat + 1) % beatspb_v);
      }, (60 / currentTempo_v) * 1000);
      intervalRef.current = intervalId;
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [playing, currentTempo_v, beatspb_v]);

  useEffect(() => {
    if (playing && timerDuration > 0) {
      if (remainingTime === 0) {
        setRemainingTime(timerDuration * 60);
      }
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    if (!playing) {
      clearInterval(timerRef.current);
    }

    if (remainingTime === 0 && timerDuration > 0) {
      setPlaying(false);
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [playing, remainingTime, timerDuration]);

  useEffect(() => {
    if (!playing) {
      setCurrentBeat(0);
      clearInterval(intervalRef.current);
    }
  }, [playing]);

  const stopPlaying = () => {
    setPlaying(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div id="soundSelect">
        <span>sound</span>
        <select onChange={(e) => setSound(e.target.value)}>
          <option value={"a"}>Tick</option>
          <option value={"b"}>Bell</option>
          <option value={"c"}>Pop</option>
          <option value={"d"}>Click</option>
          <option value={"e"}>Piano 1</option>
          <option value={"f"}>Piano 2</option>
          </select>
      </div>
      <header>
        <img src={logo} id="logo" alt="Berry Metronome Logo"></img>
        Berry Metronome
      </header>
      <div id="metronomeBtnBox">
        {[...Array(beatspb_v)].map((_, i) => (
          <MetronomeSoundBtn
            key={i}
            play={playing && i === currentBeat}
            playing={playing}
            sound={sound}
          />
        ))}
      </div>

      <div id="metronomePointerBox">
        <div
          id="metronmePointer"
          style={{
            animation: playing
              ? `metronomePointerAni ${120 / currentTempo_v}s infinite ease-in-out`
              : "none",
          }}
        >
          <div id="pointerDown"></div>
        </div>
        <div id="pointerHook"></div>
      </div>

      <div id="metronomeToolBox">
        <button
          className="tempoCtrlBtn"
          onClick={() => setCurrentTempo_v((x) => Math.max(1, x - 5))}
        >
          &lt;&lt;
        </button>
        <button
          className="tempoCtrlBtn"
          onClick={() => setCurrentTempo_v((x) => Math.max(1, x - 1))}
        >
          &lt;
        </button>
        <div id="currentTempoBox">{currentTempo_v}</div>
        <button
          className="tempoCtrlBtn"
          onClick={() => setCurrentTempo_v((x) => Math.min(x + 1, 300))}
        >
          &gt;
        </button>
        <button
          className="tempoCtrlBtn"
          onClick={() => setCurrentTempo_v((x) => Math.min(x + 5, 300))}
        >
          &gt;&gt;
        </button>
      </div>

      <div id="tempoSliderBox">
        <div id="tempoRangeBox">
          <div id="currentTempoName">{currentTempoName_v}</div>
          <div
            className="eachTempoRange verySlow"
            onClick={() => setCurrentTempo_v(30)}
          ></div>
          <div
            className="eachTempoRange slow"
            onClick={() => setCurrentTempo_v(60)}
          ></div>
          <div
            className="eachTempoRange moderate"
            onClick={() => setCurrentTempo_v(100)}
          ></div>
          <div
            className="eachTempoRange fast"
            onClick={() => setCurrentTempo_v(160)}
          ></div>
          <div
            className="eachTempoRange veryFast"
            onClick={() => setCurrentTempo_v(200)}
          ></div>
        </div>
        <input
          id="tempRInp"
          type="range"
          min={1}
          max={300}
          value={currentTempo_v}
          onChange={(e) => setCurrentTempo_v(Number(e.target.value))}
        ></input>
      </div>

      <div id="randomBox">
        <RandomBox
          playing={playing}
          tempo={currentTempo_v}
          beatspb={beatspb_v}
          stopPlaying={stopPlaying}
        />
      </div>

      <div id="playCtrlBox">
        <div id="beatsPbarBtn">
          Beats/bar
          <select value={beatspb_v} onChange={(e) => handleBeatsPbar_f(e)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="playBtn" onClick={() => setPlaying(!playing)}>
          <div className={`mainPlayBtn ${playing ? "playingMainBtn" : "pausedMainBtn"}`}></div>
        </div>
        <div id="timerBtn">
          Timer
          <select
            value={timerDuration}
            onChange={(e) => {
              setTimerDuration(parseInt(e.target.value, 10));
              setRemainingTime(parseInt(e.target.value, 10) * 60);
            }}
          >
            <option value={0}>off</option>
            <option value={1}>1 Min</option>
            <option value={2}>2 Min</option>
            <option value={3}>3 Min</option>
            <option value={4}>4 Min</option>
            <option value={5}>5 Min</option>
            <option value={7}>7 Min</option>
            <option value={10}>10 Min</option>
            <option value={15}>15 Min</option>
          </select>
        </div>
        <div id="countdown">{timerDuration > 0 && formatTime(remainingTime)}</div>
      </div>
    </>
  );
}

export default App;
