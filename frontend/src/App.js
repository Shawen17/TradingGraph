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
  const [result,setData]= useState({items:[{id:0,login:0,equity:0,balance:0,time:''}]})
  

  


  useEffect(()=>{
    const interval = setInterval(()=>{
      // const accounts = ['68575110','5012400620','68575228']
      // let a=[]
      // accounts.forEach(item=>{
      //   const login = item
      //   const equity = Gen(60,190)
      //   const balance= Gen(60,190)
      //   const time = new Date()
      //   const b={login:login,equity:equity,balance:balance,time:time}
      //   a.push(b)
        
      // })
      // const newResult = [...result.items,...a]
      // setData({items:newResult})
      const config ={
        headers:{
            "ngrok-skip-browser-warning":'65783',
            'Content-Type':'application/json',
            'Accept':'application/json',
          }
    };
    axios.get('https://faa2-105-112-28-134.ngrok-free.app/api/get_data/', config).then(res => setData({items:res.data}))
    },60000);
    return ()=> clearInterval(interval);
   },[result.items])

   

   var groupedData = useMemo(()=>{
    const accounts = ['68575110','5012400620','68575228']
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
