import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { Icon } from "semantic-ui-react";

const EventWorldMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDx1SR6AWnve0c20xub4Y_Y77l_Uydo23M&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div>
    <GoogleMap defaultZoom={8} defaultCenter={{ let: -34.397, lng: 150.644 }}>
      {props.events.map((event, index) => (
        <Marker position={{ lat: event.location.lat, lng: event.location.lng }}>
          <Icon name="marker" color="green" />
          {event.placeName}
        </Marker>
      ))}
    </GoogleMap>
  </div>
));
export { EventWorldMap };
