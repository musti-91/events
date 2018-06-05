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
  state = {
    events: [
      {
        title: "Anwterp Gaints basketball 0 ",
        img: "https://dummyimage.com/600x400/000/fff.jpg",
        date: "23-06-2018 20.30",
        city: "Anwterp",
        nrOfLiked: 3,
        location: "Lotto Arene",
        isLiked: false,
        description: "Final game Anwterp Gaints basketball in the lotto arena"
      },
      {
        title: "Anwterp Gaints basketball 1 ",
        img: "https://dummyimage.com/600x400/000/fff.jpg",
        date: "23-06-2018 20.30",
        city: "Anwterp",
        nrOfLiked: 5,
        location: "Lotto Arene",
        isLiked: false,
        description: "Final game Anwterp Gaints basketball in the lotto arena"
      },
      {
        title: "Anwterp Gaints basketball 2",
        img: "https://dummyimage.com/600x400/000/fff.jpg",
        date: "23-06-2018 20.30",
        nrOfLiked: 0,
        city: "Anwterp",
        location: "Lotto Arene",
        isLiked: true,
        description: "Final game Anwterp Gaints basketball in the lotto arena"
      },
      {
        title: "Anwterp Gaints basketball 3 ",
        img: "https://dummyimage.com/600x400/000/fff.jpg",
        date: "23-06-2018 20.30",
        nrOfLiked: 2,
        city: "Anwterp",
        location: "Lotto Arene",
        isLiked: true,
        description: "Final game Anwterp Gaints basketball in the lotto arena"
      }
    ]
  };
  getLikedEvents = () => {
    let sortedEvents = this.state.events;
    sortedEvents.sort((a, b) => {
      return b.nrOfLiked - a.nrOfLiked;
    });
    return sortedEvents.splice(0, 3);
  };
  addToFavourite = e => {
    console.log("add to favourite Clicked");
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
              to="add-event"
              content="Add event"
            />
            <Menu.Item name="About" as={NavLink} to="About" content="About" />
          </Menu>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Events
                  events={this.state.events}
                  addToFavourite={this.addToFavourite}
                  likedEvents={this.getLikedEvents()}
                />
              )}
            />
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
