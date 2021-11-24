import { useState } from "react";
// import MapDisplay from "./components/MapDisplay"
import Map from "./components/Map"

function App(props) {
  const [center, setCenter] = useState([43.88, -72.7317]);

  return (
    <div id="layout">
        <Map center={center} />
        {/* <MapDisplay /> */}
    </div>
  );
}

export default App;