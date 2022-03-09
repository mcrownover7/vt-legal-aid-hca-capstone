//imports
import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  ScaleControl,
} from 'react-leaflet'
import countyBoundary from '../data/countyBorder.js'

//creating a function to reset the view (center and zoom) on the map using the useMap and setView methods imported from leaflet
function MyComponent ({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom)
  map.setMinZoom(7);
  map.setMaxZoom(12);
  return null
}

function Map (props) {
  //-----------------------------------------GeoJSON onEachFeature-------------------------------------------
  //global variable to track the previously clicked county
  let previouslySelectedCounty = null
  const [map, setMap] = useState(null);

  //creating a function that allows for click evt listener using .on on the layer
  function featureSelection (feature, layer) {

    //this setStyle determines the default styling for each layer on page load for each feature
    layer.setStyle({
      fillColor: '#632E0F',
      fillOpacity: 0.5,
      color: 'black',
      weight: 1,
      opacity: 1
    })

    //attempt to set up tooltip label
    let label = feature.properties.cntyname
    layer.on('mouseover', evt => {
      layer
        .bindTooltip(label, {
          color: '#ffff00',
          permanent: false,
          direction: 'center',
          opacity: 1,
          fillOpacity: 0,
          className: 'my-labels'
        })
        .openTooltip()
    })

    if (props.isSelected) {
      if (props.navCountySelect.toUpperCase() === feature.properties.cntyname) {
        countyClick(null, layer);
      }
      props.setIsSelected(false)
    }

    //.on for the layer watching for a click evt
    layer.on(
      //click evt calls the countyClick function
      'click',
      evt => {
        countyClick(evt, layer)
      }
    )

    //--------NOTE: NON-WORKING HOVER TO CHANGE COLOR-------------
    //  if (props.countyStoryDisplay === true){
    //    return null
    //   } else{
    //     layer.on("mouseout", (evt) => {
    //         layer.setStyle({ fillColor: "#632E0F"})
    //       })
    //       layer.on("mouseover", (evt) => {
    //         layer.setStyle({ fillColor: "#205A3E" })
    //     })
    //     }
  }

  //function for when a county is clicked on the map
  function countyClick (evt, layer) {
    //resetting the center point of the map using the lat and lon from the features properties in the geojson
    props.setCenter([
      layer.feature.properties.geo_point_2d[0],
      layer.feature.properties.geo_point_2d[1]
    ])
    //zooming in on the clicked on counties center point
    props.setZoom(9)

    //using props to set toggle the feature display boolean, to hide the boolean after a county is selected
    props.setFeaturedDisplay(false)

    //using props to set toggle the county story display boolean, to show the boolean after a county is selected
    props.setCountyStoryDisplay(true)

    //using props to set the selected county using the clicked features properties
    props.setSelectedCounty(layer.feature.properties.cntyname)

    //using props to reset the index for the array shuffle display in story.js
    props.setShuffledIndex(0)
    // console.log(previouslySelectedCounty);

    //using props to reset the impact for the filter in dropdown.js
    props.setImpact('')

    //using props to reset the nav county selection
    props.setNavCountySelect('')

    //if else to check if this is the first clicked county or not. If it is not the first one clicked it will reset the styling of the previously clicked layer to the default.
    if (previouslySelectedCounty !== null) {
      //resetting the previously selected county's styling
      previouslySelectedCounty.setStyle({
        fillColor: '#632E0F',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1,
        opacity: 1
      })
      //setting the currently selected county's styling
      layer.setStyle({ fillColor: '#205A3E' })
      //updating the previously selected county's variable to the currently clicked one
      previouslySelectedCounty = layer
    } else {
      //setting the currently selected county's styling
      layer.setStyle({ fillColor: '#205A3E' })
      //updating the previously selected county's variable to the currently clicked one
      previouslySelectedCounty = layer
    }
  }

  return (
    <MapContainer
      id={'map-container'}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      touchZoom={false}
      dragging={true}
      keyboard={false}
      whenCreated={setMap}
      style={{
        // height: "600px",
        // width: "600px",
        padding: '1em',
        margin: '0 1em',
        border: 'solid 0.2em black'
      }}
    >
      {/* returning the created function with center and zoom */}
      <MyComponent center={props.center} zoom={props.zoom} />
      <TileLayer
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png'
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* GeoJSON created using the countyBoundary data imported from the VT county boundary data. GeoJSON has a onEachFeature set to call the featureSelection function that will allow for interaction with each county in the layer */}
      <GeoJSON data={countyBoundary} onEachFeature={featureSelection} />
      <ScaleControl position='topright' />
    </MapContainer>
  )
}

export default Map
