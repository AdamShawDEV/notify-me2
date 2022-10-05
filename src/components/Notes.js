import styles from './modules/Notes.module.css';
import Note from './Note';
import { useRequestData } from './hooks/useRequestData'
import { useState, useContext } from 'react';
import { NoteFilterContext } from './hooks/NoteFilterContext';
import LoadingSpinner from './LoadingSpinner';
import AddEditNote from './AddEditNote';
import { PENDING_ACTION } from '../consts';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, query, updateDoc, where, addDoc } from 'firebase/firestore';

function NewNoteButton({ addRecord }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(PENDING_ACTION.NONE);

    return (
        <>
            <button className={styles.addNewButton}
                onClick={() => setIsModalOpen(true)}
                disabled={pendingAction !== PENDING_ACTION.NONE}>
                {pendingAction === PENDING_ACTION.EDIT_ADD ? <LoadingSpinner /> : "add new"}
            </button>
            <AddEditNote
                setPendingAction={setPendingAction}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                addRecord={addRecord} />
        </>
    );
}

function Loading({ numPlaceholders }) {
    return (
        <div className={styles.notesContainer} >
            {Array.from({ length: numPlaceholders }, (_, idx) =>
                <div key={idx} className={styles.noteContainer} >
                    <div className={styles.loadingText}></div>
                    <div className={styles.contents} >
                        <div className={styles.loadingText}></div>
                        <div className={styles.loadingText}></div>
                        <div className={styles.loadingText}></div>
                    </div>
                    <div className={styles.buttonBox} >
                        <div className={styles.loadingButton}>
                            <div className={styles.loadingText}></div>
                        </div>
                        <div className={styles.loadingButton}>
                            <div className={styles.loadingText}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Notes({ data, loading, error, addRecord, deleteRecord, updateRecord }) {
    const { noteFilter } = useContext(NoteFilterContext);

    if (loading) return <Loading numPlaceholders={5} />;
    if (error) throw error;

    return (
        <div className={styles.notesContainer} >
            {
                data.filter((noteData) => {
                    return noteData.title.toLowerCase().includes(noteFilter.toLowerCase()) ||
                        noteData.contents.toLowerCase().includes(noteFilter.toLowerCase());
                })
                    .map((noteData) => <Note key={noteData.id}
                        note={noteData}
                        deleteRecord={deleteRecord}
                        updateRecord={updateRecord} />)}
            <NewNoteButton addRecord={addRecord} />
        </div>
    );
}

function DemoNotes() {
    const data = useRequestData();

    return (
        <Notes {...data} />
    );
};

function UserNotes() {
    const [user] = useAuthState(auth);
    const q = query(collection(db, "notes"), where("uid", '==', user.uid));
    const [snapshot, loading, error] = useCollection(q);
    const [firebaseError, setFirebaseError] = useState(null);

    async function addRecord(rec, doneCallBack = null) {
        const col = collection(db, 'notes');
        const record = { ...rec, uid: user.uid };

        try {
            await addDoc(col, record);
        } catch (e) {
            setFirebaseError(e);
        }
        if (doneCallBack) doneCallBack();
    }

    async function deleteRecord(id, doneCallBack = null) {
        try {
            await deleteDoc(doc(db, '/notes', id));
        } catch(e) {
            setFirebaseError(e);
        }
        if (doneCallBack) doneCallBack();
    }

    async function updateRecord(rec, doneCallBack = null) {
        try {
            await updateDoc(doc(db, 'notes', rec.id), rec);
        } catch (e) {
            setFirebaseError(e);
        }
        if (doneCallBack) doneCallBack();
    }

    return (
        <Notes
            data={snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))}
            loading={loading} error={error ? error : firebaseError}
            addRecord={addRecord}
            deleteRecord={deleteRecord}
            updateRecord={updateRecord} />
    );
}

export { DemoNotes, UserNotes };