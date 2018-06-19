import React from "react";
import { Card, Icon, Image, Sidebar, Segment, Button } from "semantic-ui-react";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const imageStyle = {
  width: "100%",
  height: "100%",
  display: "block"
};
const eventsAnimation = {
  appear: "animated",
  appearActive: "fadeInDown",
  enter: "animated",
  enterActive: "bounceInDown",
  exit: "animated",
  exitActive: "slideOutRight"
};
const EventList = ({ events, addToFavourite, deleteEvent }) => {
  return (
    <Sidebar.Pushable as={Segment}>
      <Card.Group fluid>
        <TransitionGroup>
          {events.map((event, index) => (
            <CSSTransition
              classNames={eventsAnimation}
              appear={true}
              timeout={1300}
            >
              <Card key={index}>
                <Image
                  fluid
                  src={event.img}
                  as="a"
                  alt={event.title}
                  size="huge"
                  href="/more/"
                  target="_blank"
                />
                <Card.Content>
                  <Card.Header>{event.title}</Card.Header>
                  <Card.Meta>
                    <p className="date">
                      {moment.unix(event.date).format("ddd DD-MM-YYYY HH:mm")}
                    </p>
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
                      <p index={index} onClick={addToFavourite}>
                        <Icon name="heart" color="green" size="large" />
                        <span>{event.nrOfLiked}</span>
                      </p>
                    </Button>
                    <Button basic color="red" index={index}>
                      <p index={index} onClick={deleteEvent}>
                        <Icon name="delete calendar" color="red" size="large" />
                        Remove
                      </p>
                    </Button>
                  </div>
                </Card.Content>
                <Card.Content extra />
              </Card>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Card.Group>
    </Sidebar.Pushable>
  );
};
export { EventList };
