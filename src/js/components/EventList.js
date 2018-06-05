import React from "react";
import { Card, Icon, Image, Grid } from "semantic-ui-react";
export const EventList = props => {
  return (
    <Grid>
      <Grid.Row>
        {props.events.map((event, index) => (
          <Grid.Column width={8} key={index}>
            <Card>
              <Image src={event.img} alt={event.title} />
              <Card.Content>
                <Card.Header>{event.title}</Card.Header>
                <Card.Meta>
                  <span className="date">{event.date}</span>
                </Card.Meta>
                <Card.Description>{event.description}</Card.Description>
              </Card.Content>
              <Card.Content extra onClick={props.addToFavourite}>
                <a>
                  <Icon name="heart" color="green" />
                  {event.nrOfLiked}
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};
