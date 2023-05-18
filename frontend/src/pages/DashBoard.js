import React, { useEffect, useState } from "react";
import axios from "axios";
import { Data } from "../components/Utility";
import styled from "styled-components";
import Graph from "../components/Graph";
import Table from "../components/Table";
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
  const [loaded, setLoaded] = useState(false);
  const [result, setData] = useState({
    items: [{ id: 0, login: 0, equity: 0, balance: 0, time: "" }],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "65783",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      axios
        .get("http://localhost:8000/api/get_data/", config)
        .then((res) => setData({ items: res.data }));
      setLoaded(true);
    }, 60000);
    return () => clearInterval(interval);
  }, [result.items]);

  const chartType = ["line", "bar", "histogram"];
  const account = "68575110";

  const finaldata = result.items.filter((item) => item.login === account);

  return (
    <Main>
      <Wrapper>
        <div>
          <NavBar />
          <Title>Trading Chart</Title>

          {loaded ? (
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
      <Table data={finaldata} />
    </Main>
  );
};

export default DashBoard;
