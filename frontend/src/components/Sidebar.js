import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  margin-top: 20px;
  width: 100%;
`;

export const Brand = styled.div`
  font-size: 18px;
  display: flex;
  width: 90%;
  margin: 5px 0px 30px 20px;
  justify-content: flex-start;
  align-items: left;
`;
const Item = styled.div`
  display: flex;
  width: 90%;
  margin: 5px 0px 5px 20px;
  justify-content: flex-start;
  align-items: left;
  color: white;
  font-size: 14px;

  cursor: pointer;

  &:hover {
    background-color: whitesmoke;
    color: teal;
  }
`;

export const BrandLogo = styled.div`
  align-items: center;
  justify-content: center;
`;

const Sidebar = () => {
  return (
    <Container>
      <Item>DashBoard</Item>
      <Item>Watchlist</Item>
      <Item>Portfolio</Item>
      <Item>Transactions</Item>
      <Item>Withdrawals</Item>
      <Item>Settings</Item>
    </Container>
  );
};

export default Sidebar;
