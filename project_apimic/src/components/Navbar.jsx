import styles from './Navbar.module.css'
import logo from '../../src/assets/babellogo.png'
const Navbar=()=>{
    return (
        <nav className={styles.nav}>
            <div>
            <img src={logo} alt="" className={styles.logo}/>
            </div>
            <ul>
            <li>HOME</li>
            <li>PROJECT</li>
            <li>TEAM</li>
            </ul>
        </nav>
    )
}

export default Navbar