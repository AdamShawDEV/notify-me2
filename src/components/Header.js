import styles from './modules/Header.module.css';
import logo from './images/logo.png';
import userImage from './images/user_pic.jpg';
import { useContext } from 'react';
import { NoteFilterContext } from './hooks/NoteFilterContext';
import { RiCloseLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';

function Header() {
    const { noteFilter, setNoteFilter } = useContext(NoteFilterContext);



    return (
        <header className={styles.header}>
            <div className={styles.logo} >
                <img src={logo} alt='notify-me' />
            </div>
            <div className={styles.filterContainer}>
                <div class={styles.filterButtonContainer}>
                    <AiOutlineSearch style={{position: 'absolute', left: '.4rem', top: '.1rem', fontSize: '1.5rem', color: 'white' }} />
                    <input className={styles.filterBox}
                        type='text'
                        placeholder='search notes'
                        onChange={e => setNoteFilter(e.target.value)}
                        value={noteFilter} />
                    {noteFilter && <button title='clear' onClick={() => setNoteFilter('')} class={styles.clearButton}><RiCloseLine /></button>}
                </div>
            </div>
            <div className={styles.userContainer} >
                <span className={styles.userName}>Adam Shaw</span>
                <img className={styles.userImage} alt='user pic' src={userImage} />
            </div>
        </header>
    );
}

export default Header;