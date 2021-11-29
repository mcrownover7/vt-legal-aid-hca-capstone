import { useState } from "react";
// import MapDisplay from "./components/MapDisplay"
import Map from "./components/Map";

function App(props) {
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [zoom, setZoom] = useState(8);

  return (
    <div id="layout">
      <Map
        center={center}
        setCenter={setCenter}
        zoom={zoom}
        setZoom={setZoom}
      />{" "}
      {/* <MapDisplay /> */}
    </div>
  );
}

export default App;
