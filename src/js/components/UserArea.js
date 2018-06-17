import React from "react";
import { Header, Image, Card, Icon } from "semantic-ui-react";
import image from "../../images/matthew.png";
import { Animated } from "react-animated-css";

export const UserArea = props => (
  <Animated animationIn="SlideInDown" animationOut="fadeOut">
    <Header color="green" size="huge" />
    <Card width={14}>
      <Image src={image} />
      <Card.Content>
        <Card.Header>Mustafa Alroomi</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2018</span>
        </Card.Meta>
        <Card.Description>
          Mustafa a is Web Developer and Basketball player
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" color="green" />
          3 Friends
        </a>
      </Card.Content>
    </Card>
  </Animated>
);
