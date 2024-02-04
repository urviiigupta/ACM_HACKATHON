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
    
    <div className={styles.sectwobg}>
      <div className={styles.meettheteam}>
          <div id="section2" className={styles.mttheading2}>
          PROJECT
          </div>

          <div className={styles.textpara}>
          <br/>
        
          Welcome to Babel, the fusion of linguistic artistry and cutting-edge technology inspired by the Tower of Babel from the Book of Genesis. Our commitment is clear – to transcend language barriers and propel communication to new heights. At Babel, we redefine the art of translation through the seamless integration of advanced AI technologies.
          
            Our mission goes beyond mere translation; we aspire to preserve the original meaning and emotion in a nuanced and faithful rendition. Unlike traditional methods, our platform utilizes sophisticated linguistic models that extend beyond line-by-line translation, providing a comprehensive solution for text, paragraphs, and phrases.

            The core of Babel lies in the symbiotic relationship between art and technology. Precision and innovation are our guiding principles as we transform language translation into an immersive experience. The intricate dance between human expression and computational power is reflected in our approach, ensuring a harmonious blend that enhances understanding.

            As we venture into the realms of literature, our vision expands beyond linguistic conversion. Babel aims to make technology a gateway to accessibility. We introduce features such as the transformation of entire PDFs, demonstrating a commitment to practicality and user-friendly solutions. Furthermore, the utilization of generative AI for image retrieval from plays showcases our dedication to pushing the boundaries of what technology can achieve in the realm of language.
            Babel is not just a translation service; it signifies a paradigm shift in linguistic innovation. Join us on this journey to unlock the true potential of language and technology. Together, let's elevate communication to new heights at Babel, where the convergence of art and technology creates a transformative and inclusive linguistic experience.
          
          </div>
        </div>
    </div>
      <div className={styles.meettheteam}>
        <div className={styles.mttheading} id="section3" >
        MEET THE TEAM
        </div>
        <div className={styles.aboutprojectbox}>
        <Nexsuscard imagelink={diyad} pname={"Diya Dugar"} gitlink={"https://github.com/Diyadx"} gitdis={"@diyadx"}></Nexsuscard>
        <Nexsuscard imagelink={pareshm} pname={"Paresh Malviya"} gitlink={"https://github.com/Pareshm004"} gitdis={"@pareshm004"}></Nexsuscard>
        <Nexsuscard imagelink={pratyushk} pname={"Pratyush Kamal"} gitlink={"https://github.com/pratyush0000"} gitdis={"@pratyush0000"}></Nexsuscard>
        <Nexsuscard imagelink={urvig} pname={"Urvi Gupta"} gitlink={"https://github.com/urviiigupta"} gitdis={"@urviiigupta"}></Nexsuscard>
      </div>
      </div>

     
      </div>


 )
}

export default App
