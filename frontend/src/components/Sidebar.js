import React, { useState } from "react";
import styled from "styled-components";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #4682b4;
  width: 15%;
  z-index: 9;
  height: 400px;

  @media screen and (max-width: 568px) {
    width: 40%;
    margin-top: 50px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-contents: flex-start;
  width: 90%;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const Item = styled.div`
  display: flex;
  width: 90%;
  margin: 5px 0px 5px 20px;
  justify-content: flex-start;
  align-items: left;

  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #9fe2bf;
    color: white;
    border-radius: 5px;
    transform: scale(1.2);
    transition: 1s ease-in-out;
  }
`;

export const BrandLogo = styled.div`
  align-items: center;
  justify-content: center;
`;

const Sidebar = (props) => {
  const [display, setDisplay] = useState(false);

  const onMenuClick = () => {
    setDisplay(!display);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="hamburger">
        <MenuOutlinedIcon onClick={onMenuClick} />
      </div>
      <div className={display ? "appear" : "sidebar-appear"}>
        <Container>
          <Brand>
            <div style={{ fontWeight: "bolder" }}>Brand</div>
            <FormGroup
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginLeft: "auto",
              }}
            >
              <FormControlLabel
                control={<Switch defaultChecked onClick={props.handlechange} />}
                label={props.mode}
              />
            </FormGroup>
          </Brand>
          <Item>Watchlist</Item>
          <Item>Portfolio</Item>
          <Item>Transactions</Item>
          <Item>Withdrawals</Item>
          <Item>Settings</Item>
        </Container>
      </div>
    </div>
  );
};

export default Sidebar;
