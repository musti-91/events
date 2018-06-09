import React from "react";
import { Card, Icon, Image, Grid, Sidebar, Segment } from "semantic-ui-react";
export const EventList = props => {
  return (
    <Sidebar.Pushable as={Segment}>
      <Grid>
        <Grid.Row>
          {props.events.map((event, index) => (
            <Grid.Column width={8} key={index}>
              <Card fluid>
                <Image src={event.img} alt={event.title} />
                <Card.Content>
                  <Card.Header>{event.title}</Card.Header>
                  <Card.Meta>
                    <span className="date">{event.date}</span>
                  </Card.Meta>
                  <Card.Meta className="price" color="green">
                    <span className="price">{event.price} €</span>
                  </Card.Meta>
                  <Card.Description>{event.description}</Card.Description>
                </Card.Content>
                <Card.Content extra index={index}>
                  <p index={index} onClick={props.addToFavourite}>
                    <Icon name="heart" color="green" size="large" />
                    <span>{event.nrOfLiked}</span>
                  </p>
                  <p index={index} onClick={props.deleteEvent}>
                    <Icon name="delete calendar" color="red" size="large" />
                    Remove
                  </p>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Sidebar.Pushable>
  );
};
