import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const setting = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  };

  return (
    <>
      {images.length > 1 ? (
        <div
          style={{
            paddingRight: "30px",
            paddingLeft: "30px",
            backgroundColor: "black",
            textAlign: "center"
          }}
        >
          <Slider {...setting}>
            {images.map((v, i) => {
              return (
                <div>
                  <img
                    src={`http://localhost:3060/${v.src}`}
                    style={{
                      height: "420px",
                      width: "100%"
                    }}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <img
          src={`http://localhost:3060/${images[0].src}`}
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </>
  );
};

export default ImageCarousel;
