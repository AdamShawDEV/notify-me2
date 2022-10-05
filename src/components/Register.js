import styles from './modules/Register.module.css';
import Modal from './Modal';
import { MODAL_OPEN } from '../consts';
import { useEffect, useState } from 'react';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from './Button';


function Register({ modalOpen, setModalOpen, setToast }) {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [userImage, setUserImage] = useState('firewatch');
    const [firebaseError, setFirebaseError] = useState(null);

    useEffect(() => {
        if (loading) return;
        if (user) setModalOpen(MODAL_OPEN.NONE);

        // eslint-disable-next-line
    }, [user, loading]);

    useEffect(() => {
        if (firebaseError) {
            let message = '';

            switch (firebaseError.code) {
                case 'auth/invalid-email':
                    message = 'invalid email address';
                    break;
                case 'auth/weak-password':
                    message = 'password too weak';
                    break;
                case 'auth/email-already-in-use':
                    message = 'email already registered';
                    break;
                default:
                    message = 'error';
            }

            setToast({
                display: true,
                message,
            });
        }

        // eslint-disable-next-line
    }, [firebaseError]);

    function onClose() {
        setModalOpen(MODAL_OPEN.NONE);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (password1 !== password2) {
            setToast({
                display: true,
                message: 'passwords don\'t match',
            });
        } else {
            registerWithEmailAndPassword(name, email, password1, userImage, setFirebaseError);
        }
    }

    if (error) throw error;

    return (
        <Modal isOpen={modalOpen === MODAL_OPEN.REGISTER} handleClose={onClose}>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.registerForm} onSubmit={(e) => handleFormSubmit(e)}>
                <span>image:</span>
                <div className={styles.radioButtonBox}>
                    <label>
                        <input className={styles.radioButtonInput}
                            name="userImage" type="radio" value='firewatch'
                            checked={userImage === 'firewatch'}
                            onChange={(e) => setUserImage(e.target.value)} />
                        <div className={styles.radioButton}>
                            <img className={styles.userImage} src={process.env.PUBLIC_URL + '/images/firewatch.png'} alt='userImage1' />
                        </div>
                    </label>
                    <label>
                        <input className={styles.radioButtonInput}
                            name="userImage" type="radio" value='flower'
                            checked={userImage === 'flower'}
                            onChange={(e) => setUserImage(e.target.value)} />
                        <div className={styles.radioButton}>
                            <img className={styles.userImage} src={process.env.PUBLIC_URL + '/images/flower.png'} alt='userImage2' />
                        </div>
                    </label>
                    <label>
                        <input className={styles.radioButtonInput}
                            name="userImage" type="radio" value='smile'
                            checked={userImage === 'smile'}
                            onChange={(e) => setUserImage(e.target.value)} />
                        <div className={styles.radioButton}>
                            <img className={styles.userImage} src={process.env.PUBLIC_URL + '/images/smile.png'} alt='userImage3' />
                        </div>
                    </label>
                </div>
                <label>enter your name:</label>
                <input className={styles.inputText} type='test' value={name} onChange={(e) => setName(e.target.value)} required />
                <label>enter your e-mail:</label>
                <input className={styles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>enter password</label>
                <input className={styles.inputText} type='text' value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                <label>reenter password</label>
                <input className={styles.inputText} type='text' value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                <div className={styles.buttonBox} style={{ flexDirection: 'column !important', gap: '.8rem' }}>
                    <Button>
                        register
                    </Button>
                </div>
            </form>
            <Button onClick={signInWithGoogle}>
                register with google
            </Button>
        </Modal>
    );
}

export default Register;