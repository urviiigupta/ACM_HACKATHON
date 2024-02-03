import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from './Selectbox.module.css'

const Selectbox=(props)=>{
    let [inputValue, setInputValue] = useState("");
    let [selectedLanguage, setSelectedLanguage] = useState("");
    const [id] = useState(uuidv4());  // generate a unique id for the datalist

    const handleInputChange=(event)=>{
        setInputValue(event.target.value);
    }

    const handleSelectionChange=(event)=>{
        const selectedLangCode = event.target.value;
        const selectedLanguage = props.languages.find(language => language.langcode === selectedLangCode);
        setSelectedLanguage(selectedLanguage ? selectedLanguage.langname : "");
        props.handleSelectChange(event);
    }

    useEffect(() => {
        setInputValue(selectedLanguage);
    }, [selectedLanguage]);

    return(
        <>
        <h1 className="inlineheading">  </h1>
        {console.log(inputValue)}
        <input className={styles.selectboxcss} list={id} value={inputValue} onChange={handleInputChange} onBlur={handleSelectionChange} />
        <datalist id={id}>
           {props.languages.map((language) => {
                return <option key={language.langcode} value={language.langcode}>{language.langname}</option>;
            })}
        </datalist>
       
        </>
    )
}
export default Selectbox