import React from "react";
import "./App.css";
import Layout from "./hoc/Layout";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <Layout theme="dark">
      <DashBoard />
    </Layout>
  );
}

export default App;
