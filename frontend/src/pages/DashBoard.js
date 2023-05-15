import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { fit, extractData } from "../components/Utility";
import styled from "styled-components";
import Graph from "../components/Graph";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const Chart = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  margin-right: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 5;

  @media screen and (max-width: 920px) {
    color: black;
  }
`;

const Slice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 5px;
  flex: 1;
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
  const [chart, setChart] = useState("line");

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

  const options = [
    { label: "line", value: "line" },
    { label: "bar", value: "bar" },
    { label: "histogram", value: "histogram" },
    { label: "scatter", value: "scatter" },
  ];

  const handlechange = (e) => {
    setChart(e.target.value);
  };

  var groupedData = useMemo(() => {
    const accounts = ["68575110"];
    const allFiltered = [];
    accounts.forEach((item) => {
      const b = fit(item, result.items);
      allFiltered.push(b);
    });
    return allFiltered;
  }, [result]);

  let user, data;

  const finaldata = result.items.filter((item) => item.login === "68575110");

  return (
    <div style={{ marginTop: 60 }}>
      <Wrapper>
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            width: "20%",
            display: "flex",
            alignItems: "start",
            justifyContent: "flex-start",
            zIndex: 5,
          }}
        >
          <Sidebar />
        </div>
        <div style={{ width: "50%" }}>
          <Title>Trading Chart</Title>
          <Chart>
            <div>chart type</div>
            <select value={chart} onChange={handlechange}>
              {options.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Chart>
          {loaded ? (
            <div>
              <Container>
                {groupedData.map((item, index) => {
                  ({ user, data } = extractData(item.raw, chart));
                  return (
                    <Slice key={index}>
                      <Graph data={data} title={user} />
                    </Slice>
                  );
                })}
              </Container>
            </div>
          ) : (
            <Image src="/loading.gif" alt="loading data" />
          )}
        </div>
      </Wrapper>
      <Table data={finaldata} />
    </div>
  );
};

export default DashBoard;
