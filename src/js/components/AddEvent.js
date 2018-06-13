import React, { Component } from "react";
import { Form, Button, Icon, Header, Message } from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
class AddEvent extends Component {
  constructor(props) {
    super();
    this.state = {
      fields: {
        title: "",
        img: "",
        date: moment(),
        nrOfLiked: 0,
        city: "",
        fullAddress: "",
        location: {
          lat: "",
          lng: ""
        },
        isLiked: false,
        price: "",
        description: ""
      },
      errors: {
        title: false,
        description: false,
        fullAddress: false,
        price: false,
        city: false
      },
      added: false
    };
  }
  validate = () => {
    const fields = ["title", "city", "price", "description"];
    const errors = [];
    for (let field of fields) {
      errors.push(this.state.fields[field] === "");
    }
    this.setState({
      errors: {
        title: errors[0],
        city: errors[1],
        price: errors[2],
        description: errors[3]
      }
    });
    return errors.indexOf(true) === -1 ? true : false;
  };
  onFieldsChange = e => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields: fields
    });
  };
  onDateSelectChange = date => {
    this.setState({
      date: date
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

  onSubmit = e => {
    if (this.validate()) {
      this.props.addEvent({
        title: this.state.fields.title,
        img: this.state.fields.img,
        date: this.state.fields.date.format("X"),
        nrOfLiked: 0,
        city: this.state.fields.city,
        fullAddress: this.state.fields.fullAddress,
        location: this.state.fields.location,
        isLiked: false,
        price: this.state.fields.price,
        description: this.state.fields.description
      });
      this.setState({
        fields: {
          title: "",
          img: "",
          date: moment(),
          nrOfLiked: 0,
          city: "",
          fullAddress: "",
          location: {
            lat: "",
            lng: ""
          },
          isLiked: false,
          price: "",
          description: ""
        },
        added: true
      });
    }
  };
  render() {
    return (
      <div>
        <Header size="huge">Add Event</Header>
        <Header size="small">All fields are required</Header>
        {this.state.added && (
          <Message success>
            <Message.Header>Your event added successfully</Message.Header>
            <p>
              <Link to="/">Home</Link>
            </p>
          </Message>
        )}
        <Form size="huge" onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Input
              name="title"
              fluid
              label="Title"
              placeholder="title"
              width={10}
              onChange={this.onFieldsChange}
              value={this.state.title}
              error={this.state.errors.title}
            />
            <Form.Input
              name="city"
              error={this.state.errors.city}
              fluid
              label="City, Place .."
              placeholder="ex: Antwerpen,Lotto Arena"
              width={6}
              value={this.state.city}
              onChange={this.onFieldsChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              name="price"
              error={this.state.errors.price}
              fluid
              label="Price"
              placeholder="00.00 €"
              width={4}
              onChange={this.onFieldsChange}
            />
            <Form.Input
              name="upload"
              fluid
              icon="upload"
              label="Cover Image"
              placeholder="uploaed image"
              width={6}
              type="file"
              onChange={this.onFieldsChange}
              error={this.state.errors.img}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={8}>
              <label>Date & Time</label>
              <DatePicker
                name="date"
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
              name="address"
              fluid
              label="Full address"
              placeholder="ex: turnhoutsebaan 12, bus 30, 2140 Borgerhout"
              width={12}
              value={this.state.address}
              onChange={this.onFieldsChange}
              error={this.state.errors.fullAddress}
            />
          </Form.Group>
          <Form.TextArea
            name="description"
            error={this.state.errors.description}
            label="Description"
            placeholder="describe what your event is all about"
            onChange={this.onFieldsChange}
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
