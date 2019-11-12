import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const You = styled.div`
	margin-left: 4%;
	margin-top: 4%;

	img {
		border-radius: 30%;
		width: 24px;
		height: 24px;
	}
	span {
		font-weight: "bold";
		color: #a4a4a4;
	}
	div {
		font-weight: bold;
		color: black;
	}
`;

const Me = styled.div`
	margin-left: 4%;
	margin-top: 4%;
	div {
		font-weight: bold;
		color: black;
		text-align: right;
		margin-right: 6px;
	}
`;

const ChatItem = ({ item }) => {
	const { user } = useSelector((state) => state.user);
	return (
		<>
			{user && user.id === item.User.id ? (
				<Me>
					<div> {item.content}</div>
				</Me>
			) : (
				<You>
					<img src={`http://localhost:3060/${item.User.profile}`} />
					<span> {item.User.id}</span>
					<div> {item.content}</div>
				</You>
			)}
		</>
	);
};

export default ChatItem;
