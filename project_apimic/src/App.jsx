import { useState,useEffect } from 'react'
import Card from './components/Card'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [to,setto]=useState("");
  const [from,setfrom]=useState("");
  const [inp,setinp]=useState("");
  const [outp,setoutp]=useState("");
  let key = "fa204c207e8e4f919fe65a32aab41c90";
  let endpoint = "https://api.cognitive.microsofttranslator.com/";
const handleinpchange=(event)=>{
  setinp(event.target.value)
  console.log(inp)
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
      'from': 'en',
      'to': 'fr'
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
  <input  value={inp} onChange={handleinpchange} style={{height:"100px", width:"200px"}}>
  </input>
  <button onClick={() => getdata(inp)}>Submit</button>
  <input  value={outp} style={{height:"100px", width:"200px"}}>
  </input>
  </>
 )
}

export default App
