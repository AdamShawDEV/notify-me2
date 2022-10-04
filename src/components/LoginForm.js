import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from './Modal';
import Button from './Button';
import formStyles from './modules/AddEditNote.module.css';
import noteStyles from './modules/Note.module.css';

function LoginForm({ isModalOpen, setIsModalOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user) setIsModalOpen(false);
    }, [user]);

    function handleFormSubmit(e) {
        e.preventDefault();

        logInWithEmailAndPassword(email, password);
    }

    return (
        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
            <h1 className={noteStyles.title}>Please Login</h1>
            <form className={formStyles.editNoteForm} onSubmit={(e) => handleFormSubmit(e)}>
                <label>e-mail:</label>
                <input className={formStyles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>password</label>
                <input className={formStyles.inputText} type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className={noteStyles.buttonBox}>
                    <Button>
                        login
                    </Button>
                    <Button onClick={signInWithGoogle}>
                        login with google
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default LoginForm;