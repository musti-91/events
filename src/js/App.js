import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";
import About from "./components/About";
import NotFoundPage from "./components/NotFoundPage";
import { Menu } from "semantic-ui-react";
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
          date: {
            day: "Wednesday",
            dayNr: 27,
            month: "June",
            year: "2018",
            from: "07:30",
            to: "20:00"
          },
          placeName: "Brussels",
          nrOfLiked: 3,
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
          date: {
            day: "Sunday",
            dayNr: "17",
            month: "July",
            year: "2018",
            from: "20.30",
            to: "11.30"
          },
          placeName: "Sportpalis Antwerpen",
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
          date: {
            day: "Thursady",
            dayNr: "07",
            month: "June",
            year: "2018",
            from: "18.30",
            to: "11.30"
          },
          nrOfLiked: 2,
          placeName: "Sportpalis Antwerpen",
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
          date: {
            day: "Friday",
            dayNr: "29",
            month: "June",
            year: "2018",
            from: "20.30",
            to: "11.30"
          },
          nrOfLiked: 4,
          placeName: "Lotto Arena",
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

  render() {
    return (
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
              name="Add Event"
              as={NavLink}
              to="/add-event"
              content="Add event"
            />
            <Menu.Item name="About" as={NavLink} to="/About" content="About" />
          </Menu>
          <Switch>
            <Route exact path="/">
              <Events
                events={this.state.events}
                getLikedEvents={this.getLikedEvents}
                addToFavourite={this.addToFavourite}
              />
            </Route>
            <Route
              exact
              path="/add-event"
              render={() => <AddEvent events={this.state.events} />}
            />
            <Route exact path="/about" component={About} />
            <Route component={NotFoundPage} />
          </Switch>
          {/* // custom footer later on will be added  */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
