import styles from './modules/Header.module.css';
import logo from './images/logo.png';
import userImage from './images/user_pic.jpg';
import { useContext, useState } from 'react';
import { NoteFilterContext } from './hooks/NoteFilterContext';
import { RiCloseLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from './Button';
import LoginForm from './LoginForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';

function Header() {
    const { noteFilter, setNoteFilter } = useContext(NoteFilterContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user] = useAuthState(auth);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo} >
                    <img src={logo} alt='notify-me' />
                </div>
                <div className={styles.filterContainer}>
                    <div className={styles.filterButtonContainer}>
                        <AiOutlineSearch style={{ position: 'absolute', left: '.4rem', top: '.25rem', fontSize: '1.5rem', color: '#696969ff' }} />
                        <input className={styles.filterBox}
                            type='text'
                            placeholder='search notes'
                            onChange={e => setNoteFilter(e.target.value)}
                            value={noteFilter} />
                        {noteFilter && <button title='clear' onClick={() => setNoteFilter('')} class={styles.clearButton}><RiCloseLine /></button>}
                    </div>
                </div>
                <div className={styles.userContainer} >
                    {/* <span className={styles.userName}>Adam Shaw</span>
                <img className={styles.userImage} alt='user pic' src={userImage} /> */}
                    {user ?
                        <Button onClick={logout}>
                            logout
                        </Button> :
                        <Button onClick={() => setIsModalOpen(true)}>
                            login
                        </Button>}
                </div>
            </header>
            <LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
}

export default Header;