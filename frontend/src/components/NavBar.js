import React from "react";
import styled from "styled-components";
import NotificationModal from "./NotificationModal";
import MessageModal from "./MessageModal";
import AccountDropdown from "./AccountDropdown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const RightNav = styled.div`
  height: 60px;
  background-color: whitesmoke;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  cursor: pointer;
  margin-left: 20px;
  width: 30%;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 70%;
  color: teal;
  cursor: pointer;
  margin-left: auto;
`;
const ProfileImage = styled.img`
  border-radius: 50px;
  height: 60px;
  width: 60px;
`;
const Display = styled.div`
  display: flex;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.h1`
  color: teal;
  margin-right: 30px;

  @media screen and (max-width: 598px) {
    margin-right: 5px;

    ${Left} {
      margin-left: 5px;
      width: 40%;
    }
    ${Right} {
      justify-content: center;
      width: 60%;
    }
    ${Display} {
      font-size: 12px;
      justify-content: flex-end;
    }
  }
`;

const NavBar = (props) => {
  return (
    <div
      style={{
        marginBottom: 60,
        position: "fixed",
        zIndex: 9,
        top: 0,
        right: 0,
        left: 0,
        display: "flex",
      }}
    >
      <RightNav>
        <Left>
          <BrandName>Brand</BrandName>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked onClick={props.handlechange} />}
              label={props.mode}
              style={{ color: "teal" }}
            />
          </FormGroup>
        </Left>
        <Right>
          <Display>
            <NotificationModal create={true} />
          </Display>
          <Display>
            <MessageModal create={true} />
          </Display>

          <ProfileImage src="/default_pic.jpg" />
          <div>Common man</div>
          <AccountDropdown />
        </Right>
      </RightNav>
    </div>
  );
};

export default NavBar;
