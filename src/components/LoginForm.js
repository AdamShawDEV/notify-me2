import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from './Modal';
import Button from './Button';
import styles from './modules/Login.module.css';
import LinkButton from './LinkButton';
import { MODAL_OPEN } from '../consts';

function LoginForm({ modalOpen, setModalOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [firebaseError, setFirebaseError] = useState(null);

    useEffect(() => {
        if (loading) return;
        if (user) closeForm();
        // eslint-disable-next-line
    }, [user, loading]);

    function handleFormSubmit(e) {
        e.preventDefault();

        logInWithEmailAndPassword(email, password, setFirebaseError);
    }

    function register() {
        closeForm();
        setModalOpen(MODAL_OPEN.REGISTER);
    }

    function reset() {
        closeForm();
        setModalOpen(MODAL_OPEN.RESET);
    }

    function closeForm() {
        setEmail('');
        setPassword('');
        setModalOpen(MODAL_OPEN.NONE);
    }

    if (error) throw error;
    if (firebaseError) throw firebaseError;

    return (
        <Modal isOpen={modalOpen === MODAL_OPEN.LOGIN } handleClose={() => closeForm()}>
            <h1 className={styles.title}>Please Login</h1>
            <form className={styles.loginForm} onSubmit={(e) => handleFormSubmit(e)}>
                <label>e-mail:</label>
                <input className={styles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>password</label>
                <input className={styles.inputText} type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className={styles.buttonBox} >
                    <Button>
                        login
                    </Button>
                </div>
            </form>
            <div className={styles.buttonBox} >
                <Button onClick={() => signInWithGoogle(setFirebaseError)}>
                    login with google
                </Button>
                <LinkButton onClick={reset}>forgot password</LinkButton>
                <span>No account? <LinkButton onClick={register}>register</LinkButton></span>
            </div>
        </Modal>
    );
}

export default LoginForm;