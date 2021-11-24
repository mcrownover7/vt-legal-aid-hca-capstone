//imports
import { MapContainer, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import countyBoundary from "../data/countyBorder.js";

function Map(props) {
  return (
    <MapContainer
      center={props.center}
      zoom={8}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      dragging={false}
      zoomDelta={0}
      keyboard={false}
      style={{ height: "600px", width: "600px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={countyBoundary} style={{fillColor: '#ff6863', fillOpacity: 0.5, color: 'black', weight: 1, opacity: 1,  }} />
    </MapContainer>
  );
}

export default Map;
