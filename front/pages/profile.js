import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Icon } from "antd";

import { LOAD_MY_POSTS_REQUEST } from "../reducer/user";
import Header from "../containers/Home/Header";
import PostModal from "../components/PostCarousel";

const Wrapper = styled.div`
  width: 60%;
  margin: auto;
`;

const UserInfo = styled.div`
  height: 300px;

  padding-top: 60px;
`;

const UserImage = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-left: 25%;
`;

const CustomUl = styled.ul`
  display: "flex";
  list-style: none;
  padding-left: 0px;
  margin-top: 20px;

  li {
    margin-top: 10px;
    color: #848484;
    font-weight: 600;
    font-size: 16px;
    span {
      margin-left: 5px;
      color: #262626;
    }
  }
`;

const ImgCustom = styled.img`
  width: 90%;
  height: 100%;
  cursor: pointer;
`;

const Profile = () => {
  const { user, followings, followers, posts } = useSelector(
    state => state.user
  );

  const [postModal, setPostModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_MY_POSTS_REQUEST
    });
  }, []);

  const onChangePostModal = useCallback(() => {
    setPostModal(!postModal);
  }, [postModal]);
  return (
    <div>
      <Header />
      <Wrapper>
        <UserInfo>
          <Row>
            <Col span={9}>
              {user && (
                <UserImage src={`http://localhost:3060/${user.profile}`} />
              )}
            </Col>
            <Col span={15}>
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "#262626"
                  }}
                >
                  {user && user.userId}
                </span>
                <span style={{ marginLeft: "10px" }}>{user && user.name}</span>
              </div>

              <div>
                <Button style={{ marginTop: "10px" }}>
                  <Icon type="edit" />
                  개인정보 수정
                </Button>
              </div>

              <CustomUl>
                <li>
                  게시글<span>{posts.length}</span>
                </li>
                <li>
                  팔로잉<span>{followings.length}</span>
                </li>
                <li>
                  팔로워<span>{followers.length}</span>
                </li>
              </CustomUl>
              <div />
            </Col>
          </Row>
        </UserInfo>
        <Row>
          {posts &&
            posts.map((v, i) => {
              return (
                <Col span={8}>
                  <div style={{ height: "250px" }}>
                    <ImgCustom
                      src={`http://localhost:3060/${v.Images[0].src}`}
                      onClick={onChangePostModal}
                    ></ImgCustom>
                  </div>
                           
                  {postModal && (
                    <PostModal onChangePostModal={onChangePostModal} />
                  )}
                                        
                </Col>
              );
            })}
        </Row>
      </Wrapper>
    </div>
  );
};

export default Profile;
