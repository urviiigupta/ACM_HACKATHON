import styles from './Navbar.module.css'
import logo from '../../src/assets/babellogo.png'
const Navbar=()=>{
    return (
        <nav className={styles.nav}>
            <div>
            <img src={logo} alt="" className={styles.logo}/>
            </div>
            <ul>
            <li><a  className={styles.removea} href="#section1">HOME</a></li>
            <li><a className={styles.removea} href="#section2">PROJECT</a></li>
            <li><a className={styles.removea} href="#section3">ABOUT US</a></li>
            </ul>
        </nav>
    )
}

export default Navbar