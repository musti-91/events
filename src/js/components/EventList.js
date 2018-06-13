import React from "react";
import { Card, Icon, Image, Sidebar, Segment, Button } from "semantic-ui-react";
import moment from "moment";
export const EventList = props => {
  return (
    <Sidebar.Pushable as={Segment}>
      <Card.Group>
        {props.events.map((event, index) => (
          <Card fluid key={index}>
            <Image src={event.img} alt={event.title} />
            <Card.Content>
              <Card.Header>{event.title}</Card.Header>
              <Card.Meta>
                <span className="date">
                  {moment.unix(event.date).format("ddd DD-MM-YYYY HH:mm")}
                </span>
              </Card.Meta>
              <Card.Meta />
              <span>Ticket: {event.price} €</span>
              <Card.Description>
                <p style={{ height: "100px" }}>{event.description}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra index={index}>
              <div className="ui two buttons" index={index}>
                <Button basic color="green" index={index}>
                  <p index={index} onClick={props.addToFavourite}>
                    <Icon name="heart" color="green" size="large" />
                    <span>{event.nrOfLiked}</span>
                  </p>
                </Button>
                <Button basic color="red" index={index}>
                  <p index={index} onClick={props.deleteEvent}>
                    <Icon name="delete calendar" color="red" size="large" />
                    Remove
                  </p>
                </Button>
              </div>
            </Card.Content>
            <Card.Content extra />
          </Card>
        ))}
      </Card.Group>
    </Sidebar.Pushable>
  );
};
