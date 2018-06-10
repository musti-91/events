import React from "react";
import { Icon, Popup, Button, Header, Modal, Image } from "semantic-ui-react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { mapStyle } from "./mapStyle";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibXVzaHRpIiwiYSI6ImNqaTV0YWMycTBsOXMzcW1zejBweDdwMTgifQ.s7-YuyPqzjzTJvpA_x6pmw"
});

const mapContainer = {
  width: "100%",
  height: "650px"
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
            on="click"
            hideOnScroll
            inverted
          >
            <Header size="small">{event.title}</Header>
            <p>{event.city}</p>
            {/* <Button onClick={props.onDetailPage}>More info</Button> */}
            <Modal trigger={<Button>more info</Button>} centered={false}>
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Header>{event.title}</Header>
                  <p>{event.description}</p>
                  <p>{event.date}</p>
                  <Image wrapped size="huge" src={event.img} />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Popup>
        </Marker>
      ))}
    </Map>
  </div>
);
export { EventWorldMap };
