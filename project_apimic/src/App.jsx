import { useState,useEffect } from 'react'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Selectbox from "./components/Selectbox"
import styles from './App.module.css'
import Navbar from './components/Navbar';
import Languages from './components/Languages';
import Nexsuscard from './components/Nexsuscard';
import diyad from './assets/diyad.jpeg'
import pareshm from './assets/pm4.jpg'
import pratyushk from './assets/pratyushk.jpeg'
import urvig from './assets/uggg.jpg'


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
  const [chatoutp,setchatoutp]=useState("")
  let key = "fa204c207e8e4f919fe65a32aab41c90";
  let endpoint = "https://api.cognitive.microsofttranslator.com/";
  const OPENAI_API_KEY="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"
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
   axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${inp} I translated this text from ${langfrom} to ${to} and this is the result ${outp} can you try and fix what is lost in translation and give back on the newly enhanced text make it poetic and beatuiful in case of poems
          don't give anything else`
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }
  })
  .then(response => {
    setchatoutp(response.data.choices[0].message.content);
  })
  .catch(error => {
    console.error(error);
  });
  
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
      <div className={styles.flexcontainerlang}>
      <div className={styles.messagetofrom}>
        FROM: 
      </div>
      <Selectbox languages={Languages} handleSelectChange={handleSelectChangefrom}></Selectbox>
      </div>
    <textarea  value={inp} onChange={handleinpchange} className={styles.inputboxx}>
    </textarea>
  </div>
  <div className={styles.flexelement}>
    <div className={styles.flexcontainerlang} >
      <div className={styles.messagetofrom}>
        TO: 
      </div>
      <Selectbox languages={Languages} handleSelectChange={handleSelectChangeto}></Selectbox>
      </div>
      <textarea  value={chatoutp} className={styles.inputboxx}>
      </textarea>
      </div>
  </div>

    <div className={styles.submitplacement}>
      <button onClick={() => getdata(inp)} className={styles.submitbutton}>Submit</button>
    </div>
    <div>
      <div className={styles.meettheteam}>
        <div className={styles.mttheading} >
        MEET THE TEAM
        </div>
      <div className={styles.aboutprojectbox}>
        <Nexsuscard imagelink={diyad} pname={"Diya Dugar"} gitlink={"https://github.com/Diyadx"} gitdis={"@diyadx"}></Nexsuscard>
        <Nexsuscard imagelink={pareshm} pname={"Paresh Malviya"} gitlink={"https://github.com/Pareshm004"} gitdis={"@pareshm004"}></Nexsuscard>
        <Nexsuscard imagelink={pratyushk} pname={"Pratyush Kamal"} gitlink={"https://github.com/pratyush0000"} gitdis={"@pratyush0000"}></Nexsuscard>
        <Nexsuscard imagelink={urvig} pname={"Urvi Gupta"} gitlink={"https://github.com/urviiigupta"} gitdis={"@urviiigupta"}></Nexsuscard>
      </div>
      </div>

      <div className={styles.meettheteam}>
        <div className={styles.mttheading}>
        PROJECT
        </div>

        <div className={styles.textpara}>
          Welcome to Babel, a convergence of linguistic artistry and cutting-edge technology. Our name, inspired by the Tower of Babel from the Book of Genesis, symbolizes our commitment to transcending language barriers and reaching new heights in communication.

            At Babel, we redefine the art of translation by seamlessly integrating advanced AI technologies. Our mission is to not merely translate text but to preserve the original meaning and emotion, ensuring a nuanced and faithful rendition. Unlike conventional methods, our sophisticated linguistic models go beyond line-by-line translation, providing a comprehensive solution for text, paragraphs, and phrases.

            Our platform stands as a testament to the symbiotic relationship between art and technology. With a focus on precision and innovation, Babel transforms language translation into an immersive experience. As we delve into the realms of literature, our vision expands beyond linguistic conversion. We aim to make technology a gateway to accessibility, offering features such as the transformation of entire PDFs and the utilization of generative AI for image retrieval from plays.

            Babel is more than a translation service; it's a paradigm shift in linguistic innovation. Join us on this journey to unlock the true potential of language and technology. Together, let's elevate communication to new heights at Babel.</div>
      </div>
      </div>

    </div>

 )
}

export default App
