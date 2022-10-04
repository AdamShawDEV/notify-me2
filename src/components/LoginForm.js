import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from './Modal';
import Button from './Button';
import formStyles from './modules/AddEditNote.module.css';
import noteStyles from './modules/Note.module.css';
import { useNavigate } from 'react-router-dom';

function LoginForm({ isModalOpen, setIsModalOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) closeForm();

    }, [user]);

    function handleFormSubmit(e) {
        e.preventDefault();

        logInWithEmailAndPassword(email, password);
    }

    function register() {
        closeForm();
        navigate('/register');
    }

    function reset() {
        closeForm();
        navigate('/reset');
    }

    function closeForm() {
        setEmail('');
        setPassword('');
        setIsModalOpen(false);
    }

    return (
        <Modal isOpen={isModalOpen} handleClose={() => closeForm()}>
            <h1 className={noteStyles.title}>Please Login</h1>
            <form className={formStyles.editNoteForm} onSubmit={(e) => handleFormSubmit(e)}>
                <label>e-mail:</label>
                <input className={formStyles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>password</label>
                <input className={formStyles.inputText} type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button>
                    login
                </Button>
            </form>
                <Button onClick={signInWithGoogle}>
                    login with google
                </Button>
                <Button onClick={reset}>forgot password</Button>
                <span>No account? <Button onClick={register}>register</Button></span>
        </Modal>
    );
}

export default LoginForm;