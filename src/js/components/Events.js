import React from "react";
import { EventList } from "./EventList";
import { Slider } from "./Slider";
import { EventWorldMap } from "./EventWorldMap";
import { Grid, Segment } from "semantic-ui-react";

const Events = props => (
  <Grid columns={2} divided>
    <Grid.Row stretched>
      <Grid.Column>
        <Segment>
          <Slider getLikedEvents={props.getLikedEvents} />
        </Segment>
        <Segment>
          <EventWorldMap events={props.events} />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <EventList
            events={props.events}
            addToFavourite={props.addToFavourite}
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Events;
