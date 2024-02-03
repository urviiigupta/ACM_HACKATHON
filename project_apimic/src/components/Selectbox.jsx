import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from './Selectbox.module.css'
const Selectbox=(props)=>{
    let [langsearch,setlangsearch]=useState("")
    const [id] = useState(uuidv4());  // generate a unique id for the datalist

    const handlelangsearch=(event)=>{
        setlangsearch(event.target.value)
        props.handleSelectChange(event);
    }

    return(
        <>
        <input list={id} value={langsearch} onChange={handlelangsearch} />
        <datalist id={id}>
           {props.languages.map((language) => {
                return <option key={language.langcode} className={styles.selectboxcss} value={language.langcode}>{language.langname}</option>;
            })}
        </datalist>
        </>
    )
}
export default Selectbox