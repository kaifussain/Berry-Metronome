import './App.css'
import MetronomeSoundBtn from './components/MetronomeSoundBtn'
function App() {

  return (
    <>
      <header>
        <img src='../public/BerryMetronomeLogo.jpeg' id='logo'></img>
        Berry Metronome
        </header>
      <div id='metronomeBtnBox'>
        <MetronomeSoundBtn/>
        <MetronomeSoundBtn/>
        <MetronomeSoundBtn/>
      </div>
      <div id='metronomeToolBox'>Metronome tool box</div>
    </>
  )
}

export default App
