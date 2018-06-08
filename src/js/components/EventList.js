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
                    <span className="date">{event.date.day}</span>
                    <span className="date">{event.date.dayNr}</span>
                    <span className="date">{event.date.month}</span>
                    <span className="date">{event.date.year}</span>
                    <span className="date">
                      {event.date.from}-{event.date.to}
                    </span>
                  </Card.Meta>
                  <Card.Meta className="price" color="green">
                    <span className="price">{event.price} €</span>
                  </Card.Meta>
                  <Card.Description>{event.description}</Card.Description>
                </Card.Content>
                <Card.Content extra index={index}>
                  <p index={index} onClick={props.addToFavourite}>
                    <Icon name="heart" color="green" />
                    <span>{event.nrOfLiked}</span>
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
