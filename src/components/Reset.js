import styles from './modules/Reset.module.css';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { auth, sendPasswordReset } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from './Button';
import { MODAL_OPEN } from '../consts';


function Reset({ modalOpen, setModalOpen, setToast }) {
    const [email, setEmail] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [firebaseError, setFirebaseError] = useState(null);

    useEffect(() => {
        if (loading) return;
        if (user) setModalOpen(MODAL_OPEN.NONE);

        // eslint-disable-next-line
    }, [user, loading]);

    useEffect(() => {
        if (firebaseError) {
            let message = '';

            console.log(firebaseError.code);

            switch (firebaseError.code) {
                case 'auth/invalid-email':
                    message = 'invalid email address';
                    break;
                case 'auth/user-not-found':
                    message = 'user not found';
                    break;
                default:
                    message = 'error';
            }

            setToast({
                display: true,
                message,
            });
            setFirebaseError(null);
        }
        // eslint-disable-next-line
    }, [firebaseError]);

    function onClose() {
        setModalOpen(MODAL_OPEN.NONE);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (!await sendPasswordReset(email, setFirebaseError)) {
            setToast({
                display: true,
                message: 'reset email sent',
            });
            setModalOpen(MODAL_OPEN.NONE)
        }
    }

    if (error) throw error;

    return (
        <Modal isOpen={modalOpen === MODAL_OPEN.RESET} handleClose={onClose}>
            <h1 className={styles.title}>Reset Password</h1>
            <form className={styles.resetForm} onSubmit={(e) => handleFormSubmit(e)}>
                <label>enter your e-mail:</label>
                <input className={styles.inputText} type='test' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <div className={styles.buttonBox} >
                    <Button>
                        reset
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default Reset;