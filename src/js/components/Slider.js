import React from "react";
import Carousel from "nuka-carousel";
import { Container } from "semantic-ui-react";

export const Slider = props => {
  let elements = props.getLikedEvents();
  return (
    <Container>
      <Carousel autoplay={true} autoplayInterval={3000} wrapAround={true}>
        {elements.map((el, index) => (
          <div key={index}>
            <h2>{el.title}</h2>
            <div>
              <img src={el.img} alt={el.title} />
            </div>
            <p>{el.description}</p>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};
