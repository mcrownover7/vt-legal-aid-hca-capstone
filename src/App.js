import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import MapDisplay from "./components/MapDisplay"
import Map from './components/Map'
import Home from './components/Home'

function App (props) {
  const [center, setCenter] = useState([43.88, -72.7317])

  return (
    <div id='layout'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/counties/' element={<Counties />} />
      <Route path='/counties/:county' element={<County />} /> */}
          <Map center={center} /> {/* <MapDisplay /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
