import React, { Component } from "react";
import {
  Header,
  Container,
  Form,
  Button,
  Card,
  Image
} from "semantic-ui-react";
import Axios from "axios";

class SearchEvents extends Component {
  constructor(props) {
    super();
    this.state = {
      term: "",
      events: []
    };
  }

  onFormSubmit = e => {
    this.getData(this.state.term);
  };
  getData = value => {
    let retrivedEvent = {};
    if (value === "") {
      return false;
    }
    Axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=" +
        value
    )
      .then(response => {
        const events = response.data._embedded.events;
        events.map((event, index) => {
          let fullAddress =
            event._embedded.venues[0].address.line1 +
            ", " +
            event._embedded.venues[0].city.name +
            event._embedded.venues[0].postalCode;
          retrivedEvent = {
            title: event.name,
            img: event.images[2].url,
            date:
              event.dates.start.localDate + " " + event.dates.start.localTime,
            city: event._embedded.venues[0].city.name,
            nrOfLiked: 0,
            fullAddress: fullAddress,
            location: {
              lat: parseInt(event._embedded.venues[0].location.latitude, 10),
              lng: parseInt(event._embedded.venues[0].location.longitude, 10)
            },
            isLiked: false,
            price: event.priceRanges[0].min,
            description: event.pleaseNote
          };
          this.setState({
            trem: "",
            events: [retrivedEvent, ...this.state.events]
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  onChange = e => {
    this.setState({
      term: e.target.value
    });
  };
  onAddEvent = e => {
    const index = parseInt(e.target.parentElement.getAttribute("index"), 10);
    this.state.events.map((event, key) => {
      if (key === index) {
        this.props.addEvent(event);
      }
    });
  };
  render() {
    return (
      <div>
        <Container>
          <Header size="large">Search Event</Header>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Input
              class="ui massive icon input"
              label="Event name"
              placeholder="Search between 1000 events over the world"
              width={8}
              onChange={this.onChange}
            />
            <Header as="h4" color="grey">
              Events are provided by <a>Ticketmatser</a>
            </Header>
            <Button size="large">Search</Button>
          </Form>
          <br />
        </Container>
        <Container>
          <Card.Group>
            {this.state.events.map((event, index) => (
              <Card key={index}>
                <Card.Content>
                  <Image floated="right" size="large" src={event.img} />
                  <Card.Header>{event.title}</Card.Header>
                  <Card.Meta>{event.date}</Card.Meta>
                  <Card.Meta>{event.price}</Card.Meta>
                  <Card.Description>
                    <strong>{event.description}</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra index={index}>
                  <div className="ui two buttons" index={index}>
                    <Button basic color="green" onClick={this.onAddEvent}>
                      Like
                    </Button>
                    <Button basic color="red" onClick={this.onRemoveFromList}>
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default SearchEvents;
