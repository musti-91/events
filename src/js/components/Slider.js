import React from "react";
import Carousel from "nuka-carousel";
import { Icon } from "semantic-ui-react";

export const Slider = props => {
  return (
    <Carousel>
      {props.likedEvents.map((slider, index) => (
        <div key={index}>
          <h2>{slider.title}</h2>
          <img src={slider.img} alt={slider.title} />
          <p>{slider.description}</p>
          <a>
            <Icon name="heart" color="green" />
            {slider.nrOfLiked}
          </a>
        </div>
      ))}
    </Carousel>
  );
};
