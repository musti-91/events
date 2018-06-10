import React from "react";
import { Header, Container, Image, Card, Icon } from "semantic-ui-react";
import image from "../../images/matthew.png";
export const UserArea = props => (
  <Container>
    <Header color="green" size="huge" />
    <Card width={14}>
      <Image src={image} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" color="green" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  </Container>
);
