const Selectbox=(props)=>{
    return(
        <select onChange={props.handleSelectChange}>
           {props.languages.map((language) => {
                return <option value={language.langcode}>{language.langname}</option>;
            })}
        </select>
    )
}

export default Selectbox