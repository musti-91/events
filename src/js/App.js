import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";
import SearchEvents from "./components/SearchEvents";
import NotFoundPage from "./components/NotFoundPage";
import { Menu, Container } from "semantic-ui-react";
import { UserArea } from "./components/UserArea";
import base from "./components/base";
import "../css/App.css";
import { getBounds } from "./components/helper";
/**
 * Events app:events =>events component
 * custom footer will added later
 * custom build actually
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          title: "Data Innovation Summit 2018 - #DISUMMIT - A.I.Demystified",
          img:
            "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F44571561%2F231918327288%2F1%2Foriginal.jpg?h=150&w=300&auto=compress&rect=0%2C198%2C842%2C421&s=ae8a4c0c9dd04a07357d5cf4f104fd90",
          date: "Wed June 2018 07:30",
          city: "Brussels",
          nrOfLiked: 3,
          fullAddress: "",
          location: {
            lat: 50.812023,
            lng: 4.383143
          },
          isLiked: false,
          price: 15.99,
          description:
            "Data Innovation Summit 2018 - #DISUMMIT - A.I.Demystified"
        }
      ]
    };
  }
  componentDidMount() {
    base.syncState("events/", {
      context: this,
      state: "events",
      asArray: true
    });
    console.log(this.state.events);
  }
  getLikedEvents = () => {
    let events = [...this.state.events];
    events.sort((a, b) => b.nrOfLiked - a.nrOfLiked);
    return events.splice(0, 3);
  };
  addToFavourite = e => {
    e.preventDefault();
    const tempEvents = [...this.state.events];
    const key = parseInt(e.target.parentElement.getAttribute("index"), 10);
    tempEvents[key].nrOfLiked++;
    this.setState({
      events: tempEvents
    });
  };

  getCoordinates = () => {
    const copyEvents = [...this.state.events];
    let coordinates = [];
    for (let event of copyEvents) {
      coordinates.push(event.location);
    }
    return getBounds(coordinates);
  };
  deleteEvent = e => {
    e.preventDefault();
    // should edit later
    let copyEvents = [...this.state.events];
    const key = e.target.parentElement.getAttribute("index");
    let keys = Object.keys(copyEvents);
    let index = keys.indexOf(key);
    if (index !== -1) {
      copyEvents.splice(index, 1);
    }
    this.setState({
      events: [...copyEvents]
    });
  };
  addEvent = event => {
    this.setState({
      events: [event, ...this.state.events]
    });
  };
  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Menu pointing secondary>
              <Menu.Item
                name="Home"
                as={NavLink}
                to="/"
                activeClassName="is-active"
                exact={true}
                content="Home"
              />
              <Menu.Item
                name="search events"
                as={NavLink}
                to="/search-events"
                content="Search Event"
              />
              <Menu.Item
                name="Add Event"
                as={NavLink}
                to="/add-event"
                content="Add event"
              />
              <Menu.Item
                name="user area"
                as={NavLink}
                to="/user"
                content="User Area"
              />
            </Menu>
            <Switch>
              <Route exact path="/">
                <Events
                  events={this.state.events}
                  getLikedEvents={this.getLikedEvents}
                  addToFavourite={this.addToFavourite}
                  getCoordinates={this.getCoordinates}
                  deleteEvent={this.deleteEvent}
                  onDetailPage={this.onDetailPage}
                />
              </Route>
              <Route exact path="/search-events">
                <SearchEvents addEvent={this.addEvent} />
              </Route>
              <Route
                exact
                path="/add-event"
                render={() => (
                  <AddEvent
                    events={this.state.events}
                    addEvent={this.addEvent}
                  />
                )}
              />
              <Route component={UserArea} path="/user" />
              <Route component={NotFoundPage} />
            </Switch>
            {/* // custom footer later on will be added  */}
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
