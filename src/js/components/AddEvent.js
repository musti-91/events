import React, { Component } from "react";
import { Form, Button, Icon, Header } from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geocode from "react-geocode";
class AddEvent extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      img: "",
      date: moment() ? moment().toString() : "",
      nrOfLiked: 0,
      city: "",
      fullAddress: "",
      location: {
        lat: 0,
        lng: 0
      },
      isLiked: true,
      price: 0,
      description: ""
    };
  }
  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  onCityChange = e => {
    this.setState({
      city: e.target.value
    });
  };
  onPriceChanged = e => {
    this.setState({
      price: e.target.value
    });
  };
  onFileUpload = e => {
    this.setState({
      img: e.target.value
    });
  };
  onDateSelectChange = dateResponse => {
    let dateInString = dateResponse._d.toString();
    dateInString = dateInString.substring(0, dateInString.indexOf("G"));
    this.setState({
      date: dateInString
    });
  };
  onAddressChange = e => {
    if (e.target.value === "") {
      return false;
    } else {
      Geocode.fromAddress(e.target.value).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({
            location: {
              lat: lat,
              lng: lng
            }
          });
        },
        error => {
          console.error(error);
        }
      );
    }
  };
  onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };
  onSubmit = e => {
    this.props.addEvent(this.state);
  };

  render() {
    return (
      <div>
        <Header size="huge">Add Event</Header>
        <Header size="small">All fields are required</Header>
        <Form size="large" onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Input
              fluid
              label="Title"
              placeholder="title"
              width={10}
              onChange={this.onTitleChange}
              value={this.state.title}
            />
            <Form.Input
              fluid
              label="City, Place .."
              placeholder="ex: Antwerpen,Lotto Arena"
              width={6}
              value={this.state.city}
              onChange={this.onCityChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Price"
              placeholder="00.00 €"
              width={4}
              onChange={this.onPriceChanged}
            />
            <Form.Input
              fluid
              icon="upload"
              label="Upload photo"
              placeholder="uploaed image"
              width={6}
              type="file"
              onChange={this.onFileUpload}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Date & Time</label>
              <DatePicker
                selected={moment(this.state.date)}
                onChange={this.onDateSelectChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </Form.Field>
            <Form.Input
              fluid
              label="Full address"
              placeholder="ex: turnhoutsebaan 12, bus 30, 2140 Borgerhout"
              width={14}
              value={this.state.address}
              onChange={this.onAddressChange}
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="describe what your event is all about"
            onChange={this.onDescriptionChange}
          />
          <Form.Group label="submit">
            <Button animated primary>
              <Button.Content visible>Send</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AddEvent;
