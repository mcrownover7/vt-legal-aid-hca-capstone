//imports
import { MapContainer, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import borderData from "../data/border.js";
import countyBoundary from "../data/countyBorder.js"

function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);

  return (
    <MapContainer
      center={props.center}
      zoom={8}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={true}
      touchZoom={false}
      dragging={true}
      style={{ height: "600px", width: "600px" }}
    >
   <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={countyBoundary} />
    </MapContainer>
  );
}

export default Map;