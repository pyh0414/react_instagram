import React from "react";
import Slider from "react-slick";
import Head from "next/head";

import styled from "styled-components";

const ImageCarousel = ({ images }) => {
	const setting = {
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true
	};

	const Wrapper = styled.div`
		width: 400px;
		height: 415px;
		text-align: center;
	`;

	const ImageWrapper = styled.img`
		width: auto;
		height: 415px;
		margin: 0px auto;
	`;
	return (
		<div>
			<Head>
				<link
					rel="stylesheet"
					type="text/css"
					charset="UTF-8"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>
			</Head>
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
								<Wrapper key={i}>
									<ImageWrapper src={`http://localhost:3060/${v.src}`} />
								</Wrapper>
							);
						})}
					</Slider>
				</div>
			) : (
				<Wrapper>
					<ImageWrapper src={`http://localhost:3060/${images[0].src}`} />
				</Wrapper>
			)}
		</div>
	);
};

export default ImageCarousel;
