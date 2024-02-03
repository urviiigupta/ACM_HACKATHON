import { useState,useEffect } from 'react'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Selectbox from "./components/Selectbox"
import styles from './App.module.css'
import Navbar from './components/Navbar';
import Languages from './components/Languages';
//https://urvii.cognitiveservices.azure.com/
function App() {
  const Datatosend={
    fromlang:"en",
    text:"please enter some text",
    tolang:"es"
  }

  const [to,setto]=useState("nl");
  const [langfrom,setlangfrom]=useState("en");
  const [inp,setinp]=useState("please enter some text");
  const [outp,setoutp]=useState("");
  let key = "fa204c207e8e4f919fe65a32aab41c90";
  let endpoint = "https://api.cognitive.microsofttranslator.com/";
const handleinpchange=(event)=>{
  setinp(event.target.value)
  console.log(inp)
}

const handleSelectChangefrom=(event)=>{
  setlangfrom(event.target.value)
}

const handleSelectChangeto=(event)=>{
  setto(event.target.value)
}
const getdata=(stringtochange)=>{
console.log(['fr']);
axios({
  baseURL: endpoint,
  url: '/translate',
  method: 'post',
  headers: {
      'Ocp-Apim-Subscription-Key': key,
       // location required if you're using a multi-service or regional (not global) resource.
       'Ocp-Apim-Subscription-Region':'southeastasia',
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
  },
  params: {
      'api-version': '3.0',
      'from': `${langfrom}`,
      'to': `${to}`
  },
  data: [{
      'text': `${stringtochange}`
  }],
  responseType: 'json'
}).then((response)=>{
  
  console.log(response.data[0].translations[0].text);
  setoutp(response.data[0].translations[0].text);
  setinp("")
  
}).catch(function(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
}); }
 return(
  <div className={styles.container}>
    <Navbar>
    </Navbar>
  <div className={styles.flexcontainer}>
   
    <div className={styles.flexelement}>
      <input value={to}></input>
      <Selectbox languages={Languages} handleSelectChange={handleSelectChangefrom} ></Selectbox>
    <input  value={inp} onChange={handleinpchange} style={{height:"100px", width:"200px"}}>
    </input>
  </div>
  <div className={styles.flexelement}>
  <Selectbox languages={Languages} handleSelectChange={handleSelectChangeto} ></Selectbox>
  
  <input  value={outp} style={{height:"100px", width:"200px"}}>
  </input>
    </div>
  </div>

  <button onClick={() => getdata(inp)}>Submit</button>
  </div>
 )
}

export default App
