//----Necessary imports
import React from "react";
import "../App.css";
import Map from "./Map";
import Footer from "./Footer";
import { useState } from "react"

//Home function to render page structural elements
export default function Home() {
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [zoom, setZoom] = useState(8);
  return (
    //React fragment (instead of <div>)
    <>
      <div class="wrapper">
        <div class="left">left content stuff goes here</div>
        <main>
          <Map
            center={center}
            setCenter={setCenter}
            zoom={zoom}
            setZoom={setZoom}
          />{" "}
        </main>
        <Footer />
      </div>
    </>
  );
}
