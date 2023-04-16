import  React,{useEffect,useState,useMemo} from 'react';
import './App.css';
import Graph from './pages/Graph';
import {fit,extractData} from './components/Utility';
import styled from 'styled-components';
import axios from 'axios';
import Opening from './components/Opening';

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
text-align:center;
color:white;`


function App() {
  const [loaded,setLoaded] = useState(false)
  const [result,setData]= useState({items:[{id:0,login:0,equity:0,balance:0,time:''}]})
  

  


  useEffect(()=>{
    const interval = setInterval(()=>{
      
      const config ={
        headers:{
            "ngrok-skip-browser-warning":'65783',
            'Content-Type':'application/json',
            'Accept':'application/json',
          }
    };
    axios.get('http://localhost:8000/api/get_data/', config).then(res => setData({items:res.data}));
    setLoaded(true)
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
      {loaded?
      (<div>
      <Title>Trading Dashboard App </Title>
      <Container>
        {groupedData.map((item,index)=>{
          ({user,data} = extractData(item.raw));
          return(
          <Slice key={index}>
            <Graph data={data} title={user} />
          </Slice>)
    
    })}
        
        
      </Container>
      </div>):<Opening />
    }
    </div>
  );
}

export default App;
