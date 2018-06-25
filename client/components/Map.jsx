import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { API_KEY } from '../../config.js';

const MapWithMentors = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={1}
    defaultCenter={{ lat: 39.828, lng: 98.579 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));

<MapWithAMarker
  googleMapURL={API_KEY.googleMapUrl}
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>

export default MapWithMentors;