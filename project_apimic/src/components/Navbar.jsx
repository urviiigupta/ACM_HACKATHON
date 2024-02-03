import styles from './Navbar.module.css'
import logo from '../../src/assets/Babel.png'
const Navbar=()=>{
    return (
        <nav className={styles.nav}>
            <div>
            <img src={logo} alt="" className='logo'/>
            </div>
            <ul>
            <li>HOME</li>
            <li>ABOUT US</li>
            </ul>
        </nav>
    )
}

export default Navbar