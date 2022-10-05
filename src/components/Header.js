import styles from './modules/Header.module.css';
import logo from './images/logo.png';
// import userImage from './images/user_pic.jpg';
import { useContext, useEffect, useState } from 'react';
import { NoteFilterContext } from './hooks/NoteFilterContext';
import { RiCloseLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from './Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../firebase';
import { MODAL_OPEN } from '../consts';
import { doc, getDoc, where } from 'firebase/firestore';

function Header({ setModalOpen }) {
    const { noteFilter, setNoteFilter } = useContext(NoteFilterContext);
    const [user] = useAuthState(auth);
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data());
                // setUserImage(user.photoURL);
            } else {
                setUserImage(null);
            }
        }

        getUserData();
    }, [user])

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
                        <button className={styles.userName} onClick={logout}>
                            {user.displayName}aa
                        </button> :
                        <Button onClick={() => setModalOpen(MODAL_OPEN.LOGIN)}>
                            login
                        </Button>}
                    {userImage && <img className={styles.userImage} alt='user pic' src={userImage} />}
                </div>
            </header>
        </>
    );
}

export default Header;