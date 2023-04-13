import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';

const PlotlyComponent =createPlotlyComponent(Plotly)


const Graph = (props)=>{
    const subTitle = props.title

    const layout ={
        width:600, height:340, title:`historical data of  ${subTitle}`,
        xaxis:{title:'time',type:'date'},
        yaxis:{title:'equity and balance',type:'linear',range:[0,300]},
        
        showLegend:true,
        font:{
            family:'sans-serif',
            size:12,
            color:'black'
        }
    }

    return(
        <div>
            <PlotlyComponent  data={props.data} layout={layout}/>
        </div>
    )
}


export default Graph;