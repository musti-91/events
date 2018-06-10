import React from "react";
import Carousel from "nuka-carousel";

export const Slider = props => {
  let elements = props.getLikedEvents();
  return (
    <Carousel
      autoplay={true}
      autoplayInterval={3000}
      wrapAround={true}
      style={{ height: "100%" }}
    >
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
  );
};
