import React from "react";
import { EventList } from "./EventList";
import { Slider } from "./Slider";
import { EventWorldMap } from "./EventWorldMap";
import { Grid, Segment } from "semantic-ui-react";

const sliderContainer = {
  height: "350px"
};
const Events = props => (
  <Grid columns={2} divided>
    <Grid.Row stretched>
      <Grid.Column>
        <Segment style={sliderContainer}>
          <Slider getLikedEvents={props.getLikedEvents} />
        </Segment>
        <Segment>
          <EventWorldMap
            events={props.events}
            getCoordinates={props.getCoordinates}
          />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <EventList
            events={props.events}
            addToFavourite={props.addToFavourite}
            deleteEvent={props.deleteEvent}
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Events;
