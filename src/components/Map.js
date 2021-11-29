//imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import countyBoundary from '../data/countyBorder.js'

function Map (props) {
  return (
    <MapContainer
      center={[43.88, -72.7317]}
      zoom={8}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={true}
      touchZoom={false}
      dragging={true}
      style={{ height: '600px', width: '600px' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={countyBoundary} />
    </MapContainer>
  )
}

export default Map
