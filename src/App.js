import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Map from "./components/Map";
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Nav from "./components/Nav"

function App (props) {
  return (
    <div>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Nav />
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

export default App;
