import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";
import SearchEvents from "./components/SearchEvents";
import NotFoundPage from "./components/NotFoundPage";
import { Menu, Container } from "semantic-ui-react";
import { UserArea } from "./components/UserArea";
var _ = require("lodash");
// import base from "./components/base";
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
        },
        {
          title: "JUSTIN TIMBERLAKE - THE MAN OF THE WOODS TOUR",
          img:
            "http://www.breatheheavy.com/wp-content/uploads/2018/01/justin-timberlake-filthy-stream.jpg",
          date: "Wed June 2018 07:30",
          fullAddress: "",
          city: "Sportpalis Antwerpen",
          nrOfLiked: 15,
          location: {
            lat: 51.231169,
            lng: 4.441036
          },
          isLiked: false,
          price: 65.5,
          description:
            "Following his epic Pepsi Super Bowl LII Halftime Show performance, Justin Timberlake has announced European The Man Of The Woods Tour dates. The European leg of the tour will kick off June 22 in Paris and will make 16 stops including London, Amsterdam, Berlin, and... Antwerp! Timberlake will perform at the Sportpaleis on Tuesday 17th of July.."
        },
        {
          title: "SHAKIRA",
          img:
            "http://www.attcenter.com/assets/img/SHAKIRA_EN_2426x1365-a432e7ad87.jpg",
          date: "Wed June 2018 07:30",
          fullAddress: "",
          nrOfLiked: 2,
          city: "Sportpalis Antwerpen",
          location: {
            lat: 51.231169,
            lng: 4.441036
          },
          isLiked: true,
          price: 59.99,
          description:
            "As previously announced, Shakira had to postpone her El Dorado World Tour due to voice problems. The concert in Antwerp on Sunday November 12 could therefore not take place."
        },
        {
          title: "BELGIAN LIONS",
          img:
            "https://images.voetbalkrant.com/sport/basketbal/2017/08/24/belgian-lions--salumu.jpg",
          date: "Wed June 2018 07:30",
          fullAddress: "",
          nrOfLiked: 4,
          city: "Lotto Arena",
          location: {
            lat: 51.180514,
            lng: 4.413201
          },
          isLiked: true,
          price: 30.99,
          description: "FIBA World Cup Qualifiers"
        }
      ]
    };
  }
  // componentWillMount() {
  //   base.syncState("events/", {
  //     context: this,
  //     state: "events",
  //     asArray: true
  //   });
  // }
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
  getMinOrMax(markersObj, minOrMax, latOrLng) {
    if (minOrMax === "max") {
      return _.maxBy(markersObj, function(value) {
        return value[latOrLng];
      })[latOrLng];
    } else {
      return _.minBy(markersObj, function(value) {
        return value[latOrLng];
      })[latOrLng];
    }
  }

  getBounds(markersObj) {
    var maxLat = this.getMinOrMax(markersObj, "max", "lat");
    var minLat = this.getMinOrMax(markersObj, "min", "lat");
    var maxLng = this.getMinOrMax(markersObj, "max", "lng");
    var minLng = this.getMinOrMax(markersObj, "min", "lng");

    var southWest = [minLng, minLat];
    var northEast = [maxLng, maxLat];
    return [southWest, northEast];
  }
  getCoordinates = () => {
    const copyEvents = [...this.state.events];
    let coordiantes = [];
    for (let event of copyEvents) {
      coordiantes.push(event.location);
    }
    return this.getBounds(coordiantes);
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
