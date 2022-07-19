import styles from './modules/Header.module.css';
import logo from './logo.png';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo} >
                <img src={logo} alt='notify-me' />
            </div>
            <div className={styles.userContainer} >
                <span className={styles.userName}>Adam Shaw</span>
                <img className={styles.user} src="https://via.placeholder.com/50" />
            </div>
        </header>
    );
}

export default Header;