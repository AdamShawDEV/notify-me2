import noteStyles from './modules/Note.module.css';
import formStyles from './modules/AddEditNote.module.css';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, sendPasswordReset } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from './Button';


function Reset() {
    const [email, setEmail] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/');
    }, [user, loading]);

    function onClose() {
        navigate('/');
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        sendPasswordReset(auth, email);
        navigate('/');
    }

    return (
        <Modal isOpen={true} handleClose={onClose}>
            <h1 className={noteStyles.title}>Reset Password</h1>
            <form className={formStyles.editNoteForm} onSubmit={(e) => handleFormSubmit(e)}>
                <label>enter your e-mail:</label>
                <input className={formStyles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button>
                    reset
                </Button>
            </form>
        </Modal>
    );
}

export default Reset;