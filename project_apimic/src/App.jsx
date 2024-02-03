import { useState,useEffect } from 'react'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Selectbox from "./components/Selectbox"
function App() {
  const Datatosend={
    fromlang:"en",
    text:"please enter some text",
    tolang:"es"
  }

  const Languages=[
    {
      langname:"Dutch",
      langcode: "nl" 
    },
    {
      langname:"English",
      langcode: "en" 
    },
    {
      langname:"French",
      langcode: "fr" 
    },
    {
      langname:"Japanese",
      langcode: "ja" 
    },
    {
      langname:"Hindi",
      langcode: "hi" 
     
    },
    {
      langname:"Spanish",
      langcode: "es" 
    }
  ]
  const [to,setto]=useState("");
  const [langfrom,setlangfrom]=useState("");
  const [inp,setinp]=useState(Datatosend);
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
  <>
  <select>

  </select>
  <input  value={inp.text} onChange={handleinpchange} style={{height:"100px", width:"200px"}}>
  </input>
  <Selectbox languages={Languages} handleSelectChange={handleSelectChangefrom}></Selectbox>
  <Selectbox languages={Languages} handleSelectChange={handleSelectChangeto}></Selectbox>
  <button onClick={() => getdata(inp)}>Submit</button>
  <input  value={outp} style={{height:"100px", width:"200px"}}>
  </input>
  </>
 )
}

export default App
