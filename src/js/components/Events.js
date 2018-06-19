import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import { EventList } from "./EventList";
import { EventWorldMap } from "./EventWorldMap";
import { Slider } from "./Slider";
const Events = props => (
  <Grid columns={2} divided container stackable>
    <Grid.Row stretched>
      <Grid.Column style={{ height: "650px" }}>
        <Segment>
          <Slider getLikedEvents={props.getLikedEvents} />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment style={{ height: "650px" }}>
          <EventList
            events={props.events}
            addToFavourite={props.addToFavourite}
            deleteEvent={props.deleteEvent}
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={16}>
        <Segment style={{ height: "700px" }}>
          <EventWorldMap
            events={props.events}
            getCoordinates={props.getCoordinates}
            onDetailPage={props.onDetailPage}
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Events;
