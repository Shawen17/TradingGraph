import  React,{useEffect,useState,useMemo} from 'react';
import './App.css';
import Graph from './pages/Graph';
import {fit,extractData} from './components/Utility';
import styled from 'styled-components';
import axios from 'axios';

const Container= styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
  margin-bottom:10px;
  `

const Slice = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  box-shadow: 2px 4px 8px 0 rgba(0,0,0,0.2);
  margin:5px;
  flex:1;
  `
const Title =styled.h1`
text-align:center`


function App() {
  const [result,setData]= useState({items:[{id:0,login:'',equity:'',balance:'',time:''}]})



  useEffect(()=>{
    const interval = setInterval(()=>{
      const config ={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    };
    axios.get('https://trading-graph-qymbvpp7d-shawen17.vercel.app/api/get_data/', config).then(res => setData({items:res.data}))
    },60000);
    return ()=> clearInterval(interval);
   },[])

   

   var groupedData = useMemo(()=>{
    const accounts = ['22014542','51135132','51135134']
      const allFiltered=[]
      accounts.forEach(item=>{
        const b= fit(item,result.items)
        allFiltered.push(b)
    })
    return allFiltered
   },[result])

  let user,data



  return (
    <div>
      <Title>Historical Equity Dashboard App </Title>
      <Container>
        {groupedData.map((item,index)=>{
          ({user,data} = extractData(item.raw));
          return(
          <Slice key={index}>
            <Graph data={data} title={user} />
          </Slice>)
    
    })}
        
        
      </Container>
      
    </div>
  );
}

export default App;
