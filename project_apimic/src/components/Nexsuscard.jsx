import styles from './Nexsuscard.module.css'



const Nexsuscard=(props)=>{
  return(
    <div className={styles.cardbox}>
      <img src={props.imagelink} className={styles.photopic} >
      </img>
      <h1 className={styles.cardname}>{props.pname}</h1>
      <h3><a target="_blank" href={props.gitlink} className={styles.cardlink}>{props.gitdis}</a> </h3>
    </div>
  )
}

export default Nexsuscard;