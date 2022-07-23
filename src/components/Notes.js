import styles from './modules/Notes.module.css';
import Note from './Note';
import { useRequestData, REQUEST_STATUS } from './hooks/useRequestData'
import { useState, useContext } from 'react';
import Modal from './Modal';
import { NoteFilterContext } from './hooks/NoteFilterContext';
import LoadingSpinner from './LoadingSpinner';

function generateId(numChars) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ1234567890';
    let output = '';

    for (let i = 0; i < numChars; i++) {
        output += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return output;
}

function NewNoteButton({ addRecord }) {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPendingAdd, setIsPendingAdd] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const newRec = {
            id: generateId(16),
            title,
            contents,
        };

        const callBack = () => { setIsPendingAdd(false) };

        setIsPendingAdd(true);
        addRecord(newRec, callBack);
        handleClose();
    }

    function handleClose() {
        setTitle('');
        setContents('');
        setIsModalOpen(false);
    }

    return (
        <>
            <button className={styles.addNewButton}
                onClick={() => setIsModalOpen(true)}
                disabled={isPendingAdd}>
                {isPendingAdd ? <LoadingSpinner /> : "add new" }
            </button>
            <Modal
                isOpen={isModalOpen}
                handleClose={handleClose}
                heading='Add New Note'>
                <form className={styles.newNoteForm}
                    onSubmit={e => handleSubmit(e)} >
                    <label>Title:</label>
                    <input className={styles.noteTitleInput}
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required />
                    <label>Contents:</label>
                    <textarea
                        className={styles.noteContentsInput}
                        onChange={e => setContents(e.target.value)}
                        value={contents}
                        required />
                    <div className={styles.formButtonBox}>
                        <input
                            className={styles.formButtons}
                            type="submit" value="Submit" />
                        <button
                            className={styles.formButtons}
                            onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

function Loading() {
    return (
        <div className={styles.loading} >Loading...</div>
    );
}

function Error() {
    return (
        <div className={styles.errorMessage} >An error occurred 😒</div>
    )
}

function Notes() {
    const { data, requestStatus, addRecord, deleteRecord, updateRecord } = useRequestData();
    const { noteFilter } = useContext(NoteFilterContext);

    return (
        <main className={styles.notesContainer} >
            {requestStatus === REQUEST_STATUS.LOADING ?
                <Loading /> : requestStatus === REQUEST_STATUS.SUCCESS ?
                    data.filter((noteData) => {
                        return noteData.title.includes(noteFilter) ||
                            noteData.contents.includes(noteFilter);
                    })
                        .map((noteData) => <Note key={noteData.id}
                            note={noteData}
                            deleteRecord={deleteRecord}
                            updateRecord={updateRecord} />) :
                    <Error />}
            <NewNoteButton addRecord={addRecord} />
        </main>
    );
}

export default Notes;