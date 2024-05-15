import "./App.css";
import MetronomeSoundBtn from "./components/MetronomeSoundBtn";
function App() {
  return (
    <>
      <header>
        <img src="../public/BerryMetronomeLogo.jpeg" id="logo"></img>
        Berry Metronome
      </header>
      <div id="metronomeBtnBox">
        <MetronomeSoundBtn />
        <MetronomeSoundBtn />
        <MetronomeSoundBtn />
      </div>
      <div id="metronmePointer">
        <div></div>
      </div>
      <div id="metronomeToolBox">
        <button className="tempoCtrlBtn">&lt;&lt;</button>
        <button className="tempoCtrlBtn">&lt;</button>
        <div id="currentTempoBox">120</div>
        <button className="tempoCtrlBtn">&gt;</button>
        <button className="tempoCtrlBtn">&gt;&gt;</button>
      </div>
      <div id="tempoSlider">
        <div id="tempoSliderPointer"></div>
      </div>

      <div id="randomBox">
        randomBox
      </div>

      <div id="playCtrlBox">
        <div id="beatsPbarBtn">
          Beats/bar <span id="beatsPbar">3</span>
        </div>
        <div id="playBtn">Play</div>
        <div id="timerBtn">Timer</div>
      </div>
    </>
  );
}

export default App;
