//imports
import {
  MapContainer,
  TileLayer,
  Polygon,
  GeoJSON,
  useMap,
} from "react-leaflet";
import countyBoundary from "../data/countyBorder.js";

//creating a function to reset the view (center and zoom) on the map using the useMap and setView methods imported from leaflet
function MyComponent({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map(props) {
  //global variable to track the previously clicked county
  let previouslySelectedCounty = null;

  //creating a function that allows for click evt listener using .on on the layer
  function featureSelection(feature, layer) {
    //this setStyle determines the default styling for each layer on page load for each feature
    layer.setStyle({
      fillColor: "#ff6863",
      fillOpacity: 0.5,
      color: "black",
      weight: 1,
      opacity: 1,
    });

    //.on for the layer watching for a click evt
    layer.on(
      //click evt calls the countyClick function
      "click",
      (evt) => {
        countyClick(evt, layer);
      }
    );
  }

  //function for when a county is clicked on the map
  function countyClick(evt, layer) {
    console.log(evt);
    console.log(evt.target.feature.properties.cntyname);
    //resetting the center point of the map using the lat and lon from the features properties in the geojson
    props.setCenter([
      evt.target.feature.properties.geo_point_2d[0],
      evt.target.feature.properties.geo_point_2d[1],
    ]);
    //zooming in on the clicked on counties center point
    props.setZoom(9);

    console.log(previouslySelectedCounty);

    //if else to check if this is the first clicked county or not. If it is not the first one clicked it will reset the styling of the previously clicked layer to the default.
    if (previouslySelectedCounty !== null) {
      //resetting the previously selected county's styling
      previouslySelectedCounty.setStyle({
        fillColor: "#ff6863",
        fillOpacity: 0.5,
        color: "black",
        weight: 1,
        opacity: 1,
      });
      //setting the currently selected county's styling
      layer.setStyle({ fillColor: "#0000FF" });
      //updating the previously selected county's variable to the currently clicked one
      previouslySelectedCounty = layer;
    } else {
      //setting the currently selected county's styling
      layer.setStyle({ fillColor: "#0000FF" });
      //updating the previously selected county's variable to the currently clicked one
      previouslySelectedCounty = layer;
    }
  }

  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      dragging={false}
      zoomDelta={0}
      keyboard={false}
      style={{ height: "600px", width: "600px" }}
    >
      {/* returning the created function with center and zoom */}
      <MyComponent center={props.center} zoom={props.zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* GeoJSON created using the countyBoundary data imported from the VT county boundary data. GeoJSON has a onEachFeature set to call the featureSelection function that will allow for interaction with each county in the layer */}
      <GeoJSON data={countyBoundary} onEachFeature={featureSelection} />
    </MapContainer>
  );
}

export default Map;
