import React, { useEffect, useState } from "react";
import axios from "axios";
import { Data } from "../components/Utility";
import styled from "styled-components";
import Graph from "../components/Graph";
import IndexTable from "../components/IndexTable";
import NavBar from "../components/NavBar";

const Main = styled.div``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 230px;

  @media screen and (max-width: 568px) {
    margin: 0px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
`;

const Slice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 5px;
  flex: 0.5;
`;
const Title = styled.h1`
  text-align: center;
`;

const Image = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashBoard = () => {
  // const [loaded, setLoaded] = useState(false);
  // const [result, setData] = useState({
  //   items: [{ id: 0, login: 0, equity: 0, balance: 0, time: "" }],
  // });
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const config = {
  //       headers: {
  //         "ngrok-skip-browser-warning": "65783",
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     };
  //     axios
  //       .get("http://localhost:8000/api/get_data/", config)
  //       .then((res) => setData({ items: res.data }));
  //     setLoaded(true);
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, [result.items]);
  useEffect(() => {
    const config = {
      headers: {
        "ngrok-skip-browser-warning": "65783",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios.get("https://a2ae-81-24-192-5.ngrok-free.app/api/get_data/", config);
    // Create WebSocket connection
    const newSocket = new WebSocket(
      "ws://a2ae-81-24-192-5.ngrok-free.app/ws/chart/"
    );

    // Store the WebSocket connection in state
    setSocket(newSocket);

    // Clean up the WebSocket connection on component unmount
    // return () => {
    //   newSocket.close();
    // };
  }, []);

  useEffect(() => {
    // Subscribe to WebSocket events
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection established.");
      };

      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setData(newData);
      };
    }
  }, [socket]);

  const chartType = ["scatter", "bar", "histogram"];
  const account = "68575110";

  // const finaldata = result.items.filter((item) => item.login === account);
  const finaldata = data.filter((item) => item.login === account);
  return (
    <Main>
      <Wrapper>
        <div>
          <NavBar />
          <Title>Trading Chart</Title>

          {data ? (
            <Container>
              {chartType.map((item, index) => {
                return (
                  <Slice key={index}>
                    <Graph data={Data(finaldata, item)} title={item} />
                  </Slice>
                );
              })}
            </Container>
          ) : (
            <Image src="/loading.gif" alt="loading data" />
          )}
        </div>
      </Wrapper>
      <IndexTable data={finaldata.splice(0, 1)} />
    </Main>
  );
};

export default DashBoard;
