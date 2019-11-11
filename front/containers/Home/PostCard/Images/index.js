import React from "react";
import styled from "styled-components";

const ImgCustom = styled.img`
	width: 100%;
	height: 100%;
`;

const Image = ({ images }) => {
	return (
		<>
			<ImgCustom src={`http://localhost:3060/${images[0].src}`} />
		</>
	);
};

export default Image;
