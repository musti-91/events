import React from "react";
import { Icon, Popup, Button, Header } from "semantic-ui-react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { mapStyle } from "./mapStyle";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibXVzaHRpIiwiYSI6ImNqaTV0YWMycTBsOXMzcW1zejBweDdwMTgifQ.s7-YuyPqzjzTJvpA_x6pmw"
});

const mapContainer = {
  width: "100%",
  height: "500px"
};
const EventWorldMap = props => (
  <div style={mapContainer}>
    <Map
      style={mapStyle}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
      fitBounds={props.getCoordinates()}
      fitBoundsOptions={{ padding: 10, linear: true, offset: [0, 30] }}
      animationOptions={true}
    >
      {props.events.map((event, key) => (
        <Marker
          key={key}
          coordinates={[event.location.lng, event.location.lat]}
          anchor="bottom"
        >
          <Popup
            trigger={<Icon name="marker" color="black" size="large" />}
            flowing
            hoverable
          >
            <Header size="small">{event.title}</Header>
            <p>{event.city}</p>
            <Button>More info</Button>
          </Popup>
        </Marker>
      ))}
    </Map>
  </div>
);
export { EventWorldMap };
