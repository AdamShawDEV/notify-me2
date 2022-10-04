import noteStyles from './modules/Note.module.css';
import formStyles from './modules/AddEditNote.module.css';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from './Button';


function Register() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
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

        if (password1 !== password2) {
            alert('passwords must match');
        } else {
            registerWithEmailAndPassword(name, email, password1);
        }
    }

    return (
        <Modal isOpen={true} handleClose={onClose}>
            <h1 className={noteStyles.title}>Register</h1>
            <form className={formStyles.editNoteForm} onSubmit={(e) => handleFormSubmit(e)}>
                <label>enter your name:</label>
                <input className={formStyles.inputText} type='test' value={name} onChange={(e) => setName(e.target.value)} required />
                <label>enter your e-mail:</label>
                <input className={formStyles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>enter password</label>
                <input className={formStyles.inputText} type='text' value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                <label>reenter password</label>
                <input className={formStyles.inputText} type='text' value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                <div className={noteStyles.buttonBox} style={{ flexDirection: 'column !important', gap: '.8rem' }}>
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