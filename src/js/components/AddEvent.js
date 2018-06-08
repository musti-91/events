import React, { Component } from "react";
import { Form, Button, Icon, Header } from "semantic-ui-react";

const Wrapper = {
  width: "80%",
  height: "auto",
  margin: "0 auto"
};
class AddEvent extends Component {
  handleSubmit = e => {
    console.log(e.target.value);
  };
  render() {
    return (
      <div style={Wrapper}>
        <Header size="huge">Add Event</Header>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input fluid label="Title" placeholder="title" width={10} />
            <Form.Input
              fluid
              label="Place"
              placeholder="ex: lotto arena"
              width={6}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input fluid label="Price" placeholder="0.0 €" width={4} />
          </Form.Group>
          <Form.Group>
            <Form.Input fluid label="Day" placeholder="day" width={2} />
            <Form.Input fluid label="Month" placeholder="month" width={2} />
            <Form.Input fluid label="Year" placeholder="year" width={4} />
            <Form.Input fluid label="Time" placeholder="time" width={8} />
          </Form.Group>
          {/* <Form.Select options={options} placeholder="Gender" error /> */}
          <Form.Group>
            <Form.Input
              fluid
              label="Street"
              placeholder="ex: turnhoutsebaan"
              width={6}
            />
            <Form.Input
              fluid
              label="Building number"
              placeholder="ex: 12, bus 202"
              width={6}
            />
            <Form.Input
              fluid
              label="City"
              placeholder="ex: Awtwerpen"
              width={4}
            />
            <Form.Input fluid label="Post Code" placeholder="2140" width={2} />
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="describe what your event is all about"
          />
          <Form.Checkbox label="agree the terms otherwise will not send it" />
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
