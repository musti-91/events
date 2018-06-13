import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";
import SearchEvents from "./components/SearchEvents";
import NotFoundPage from "./components/NotFoundPage";
import { Menu, Container, Dimmer, Loader, Icon } from "semantic-ui-react";
import { UserArea } from "./components/UserArea";
import "../css/App.css";
import { getBounds } from "./components/helper";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import base, { uiConfig } from "./components/base";
import Link from "react-router-dom/Link";

/**
 *
 * Events app:events =>events component
 * custom footer will added later
 * custom build actually
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loadingEvents: true,
      events: []
    };
  }
  componentDidMount() {
    base.syncState("events/", {
      context: this,
      state: "events",
      asArray: true,
      then: () => {
        this.setState({ loadingEvents: false });
      }
    });
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isLoggedIn: !!user }));
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
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
                name="events"
                as={NavLink}
                to="/"
                content="Events"
                activeClassName="is-active"
                exact={true}
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
              <Menu.Item name="login" as={NavLink} to="/login">
                <Icon name="sign in" />
              </Menu.Item>
            </Menu>
            {this.state.loadingEvents && (
              <Dimmer active inverted>
                <Loader inverted content="Loading" />
              </Dimmer>
            )}
            <Switch>
              <Route exact path="/">
                {!this.state.loadingEvents && (
                  <Events
                    loading={this.state.loading}
                    events={this.state.events}
                    getLikedEvents={this.getLikedEvents}
                    addToFavourite={this.addToFavourite}
                    getCoordinates={this.getCoordinates}
                    deleteEvent={this.deleteEvent}
                    onDetailPage={this.onDetailPage}
                  />
                )}
              </Route>
              <Route exact path="/search-events">
                <SearchEvents addEvent={this.addEvent} />
              </Route>
              <Route exact path="/login">
                <div>
                  {!this.state.isLoggedIn && (
                    <div>
                      <h1>Please Sign in</h1>
                      <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                    </div>
                  )}
                  {this.state.isLoggedIn && (
                    <div>
                      <h1>My App</h1>
                      <p>
                        Welcome {firebase.auth().currentUser.displayName}! You
                        are now signed-in!
                      </p>
                      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                    </div>
                  )}
                </div>
              </Route>
              <Route exact path="/add-event">
                {this.state.isLoggedIn ? (
                  <AddEvent addEvent={this.addEvent} />
                ) : (
                  <div>
                    <h1>You need to log in.</h1>
                    <p>
                      Go to<Link to="/login">login page</Link>
                    </p>
                  </div>
                )}
              </Route>
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
