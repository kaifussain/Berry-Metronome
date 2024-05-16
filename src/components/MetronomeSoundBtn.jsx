import React, { useState } from 'react'
import './MetronomeSoundBtn.css'
const MetronomeSoundBtn = () => {
  const [mode,setMode]=useState(1)
  return (
    <div id='MetronomeSoundBtn' className={mode===0?'mode0':(mode===1?'mode1':'mode2')} onClick={()=>setMode(m=>(m+1)%3)}></div>
  )
}

export default MetronomeSoundBtn