import {useState, useEffect } from "react";
import "./App.css";
import MetronomeSoundBtn from "./components/MetronomeSoundBtn";
function App() {
  const [beatspb_v, setBeatpb_v] = useState(3)
  const [currentTempo_v, setCurrentTempo_v] = useState(20)
  const [currentTempoName_v, setCurrentTempoName_v] = useState("Larghissimo")

  function handleBeatsPbar_f(e){
    setBeatpb_v(parseInt(e.target.value, 10))
  }
 
  useEffect(() => {
    function updateTempoName_f() {
      if (currentTempo_v < 20) setCurrentTempoName_v("Larghissimo");
      else if(currentTempo_v<40) setCurrentTempoName_v("Grave");
      else if(currentTempo_v>=40 && currentTempo_v<=60) setCurrentTempoName_v("Lento/Largo");
      else if(currentTempo_v>60 && currentTempo_v<66) setCurrentTempoName_v("");
      else if(currentTempo_v>=66 && currentTempo_v<=76) setCurrentTempoName_v("Adagio");
      else if(currentTempo_v>76 && currentTempo_v<=80) setCurrentTempoName_v("Adagietto");
      else if(currentTempo_v>80 && currentTempo_v<=108) setCurrentTempoName_v("Andante");
      else if(currentTempo_v>108 && currentTempo_v<=120) setCurrentTempoName_v("Moderato");
      else if(currentTempo_v>120 && currentTempo_v<=168) setCurrentTempoName_v("Allegro");
      else if(currentTempo_v>168 && currentTempo_v<=176) setCurrentTempoName_v("Vivace");
      else if(currentTempo_v>176 && currentTempo_v<=200) setCurrentTempoName_v("Presto");
      else if(currentTempo_v>200) setCurrentTempoName_v("Prestissimo")
    }

    updateTempoName_f();
  }, [currentTempo_v]);

  return (
    <>
      <div id="forTestingOnly">
        {/* beatspb_v={beatspb_v} <br/> */}
        {/* currentTempo_v={currentTempo_v} <br/> */}
        {/* {tempoSP_ref.} */}
        {currentTempoName_v}
      
      </div>


      <header>
        <img src="../public/BerryMetronomeLogo.jpeg" id="logo"></img>
        Berry Metronome
      </header>
      <div id="metronomeBtnBox">
        {
          [...Array(beatspb_v)].map((_,i)=>(
            <MetronomeSoundBtn key={i}/>
          ))
        }
      </div>


      <div id="metronmePointer">
        <div></div>
      </div>


      <div id="metronomeToolBox">
        <button className="tempoCtrlBtn" onClick={()=>setCurrentTempo_v(x=>Math.max(0,x-20))}>&lt;&lt;</button>
        <button className="tempoCtrlBtn" onClick={()=>setCurrentTempo_v(x=>Math.max(0,x-5))}>&lt;</button>
        <div id="currentTempoBox">{currentTempo_v}</div>
        <button className="tempoCtrlBtn" onClick={()=>setCurrentTempo_v(x=>Math.min(x+5,300))}>&gt;</button>
        <button className="tempoCtrlBtn" onClick={()=>setCurrentTempo_v(x=>Math.min(x+20,300))}>&gt;&gt;</button>
      </div>


     <div id="tempoSliderBox">
        <div id="tempoRangeBox">
        <div id="currentTempoName">{currentTempoName_v}</div>
          <div className="eachTempoRange verySlow" 
          onClick={()=>setCurrentTempo_v(30)}></div>
          <div className="eachTempoRange slow"
          onClick={()=>setCurrentTempo_v(60)}></div>
          <div className="eachTempoRange moderate"
          onClick={()=>setCurrentTempo_v(100)}></div>
          <div className="eachTempoRange fast"
          onClick={()=>setCurrentTempo_v(160)}></div>
          <div className="eachTempoRange veryFast"
          onClick={()=>setCurrentTempo_v(200)}></div>
        </div>
        <input id="tempRInp" type="range" min={0} max={300} value={currentTempo_v} onChange={e=>setCurrentTempo_v(e.target.value)}></input>
     </div>


      <div id="randomBox">
        randomBox
      </div>


      <div id="playCtrlBox">
        <div id="beatsPbarBtn">
          Beats/bar
          <select value={beatspb_v} onChange={(e)=>handleBeatsPbar_f(e)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <div id="playBtn">Play</div>
        <div id="timerBtn">Timer</div>
      </div>
    </>
  );
}

export default App;
