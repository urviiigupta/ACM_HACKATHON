import { useState } from "react";

const Selectbox=(props)=>{
    let [langsearch,setlangsearch]=useState("")
    
    const handlelangsearch=(event)=>{
        setlangsearch(event.target.value)
    }

    const filteredLanguages = props.languages.filter(language => 
        language.langname.toLowerCase().startsWith(langsearch.toLowerCase())
    );

    return(
        <>
        <input value={langsearch} onChange={handlelangsearch}></input>
        <select onChange={props.handleSelectChange}>
           {filteredLanguages.map((language) => {
                return <option key={language.langcode} value={language.langcode}>{language.langname}</option>;
            })}
        </select>
        </>
    )
}
export default Selectbox