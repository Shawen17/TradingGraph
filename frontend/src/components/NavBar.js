import React from "react";
import styled from "styled-components";
import NotificationModal from "./NotificationModal";
import MessageModal from "./MessageModal";
import AccountDropdown from "./AccountDropdown";

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  cursor: pointer;
  margin-left: 20px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  color: teal;
  cursor: pointer;
`;

const RightNav = styled.div`
  height: 60px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  

  @media screen and (max-width: 568px) {
    justify-content: flex-end;
    
    
    ${Left} {
      
      margin-left: 0px;
    }
   
    }
  }
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

const NavBar = () => {
  return (
    <RightNav>
      <Left></Left>
      <Right>
        <Display className="notify">
          <NotificationModal create={true} />
        </Display>
        <Display className="notify">
          <MessageModal create={true} />
        </Display>

        <ProfileImage src="/default_pic.jpg" />
        <div style={{ marginLeft: 5 }}>Common man</div>
        <AccountDropdown />
      </Right>
    </RightNav>
  );
};

export default NavBar;
