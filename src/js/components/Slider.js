import React from "react";
import Carousel from "nuka-carousel";

export const Slider = props => {
  const imageContainer = {
    display: "block",
    width: "100%",
    height: "auto",
    backgroundColor: "red"
  };
  let elements = props.getLikedEvents();
  return (
    <Carousel autoplay={true} autoplayInterval={3000} wrapAround={true}>
      {elements.map((el, index) => (
        <div key={index}>
          <h2>{el.title}</h2>
          <div className={imageContainer}>
            <img src={el.img} alt={el.title} />
          </div>
          <p>{el.description}</p>
        </div>
      ))}
    </Carousel>
  );
};
