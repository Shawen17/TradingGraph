import React from "react";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const PlotlyComponent = createPlotlyComponent(Plotly);

const Graph = (props) => {
  const subTitle = props.title;

  const layout = {
    title: `trading plot in ${subTitle}`,
    xaxis: { title: "time", type: "date" },
    yaxis: { title: "equity and balance", type: "linear" },
    width: 400,
    height: 400,

    showLegend: true,
    font: {
      family: "sans-serif",
      size: 12,
      color: "black",
    },
    paper_bgcolor: "#7f7f7",
    plot_bgcolor: "#c7c7c7",
  };

  return (
    <div>
      <PlotlyComponent data={props.data} layout={layout} />
    </div>
  );
};

export default Graph;
