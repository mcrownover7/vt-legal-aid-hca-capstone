import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import MapDisplay from "./components/MapDisplay"
import Map from './components/Map'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

function App (props) {
  return (
    <div id='layout'>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          {/* <Route path='/counties/' element={<Counties />} />
      <Route path='/counties/:county' element={<County />} /> */}
          <Route path='/map' element={<Map />} /> {/* <MapDisplay /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}

export default App
