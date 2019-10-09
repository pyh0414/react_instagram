import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const setting = {
    dots: true,
    speed: 500
  };

  console.log(images);
  return (
    <Slider {...setting}>
      {images.map((v, i) => {
        return (
          <div key={i}>
            <img
              src={`http://localhost:3060/${v.src}`}
              style={{ width: "100%" }}
            ></img>
          </div>
        );
      })}
    </Slider>
  );
};

export default ImageCarousel;
