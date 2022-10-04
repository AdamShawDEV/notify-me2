import styles from './modules/Notes.module.css';
import noteStyles from './modules/Note.module.css';
import Note from './Note';
import { useRequestData, REQUEST_STATUS } from './hooks/useRequestData'
import { useState, useContext } from 'react';
import { NoteFilterContext } from './hooks/NoteFilterContext';
import LoadingSpinner from './LoadingSpinner';
import AddEditNote from './AddEditNote';
import { PENDING_ACTION } from '../consts';

function NewNoteButton({ addRecord }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(false);

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
                <div key={idx} className={noteStyles.noteContainer} >
                    <div className={noteStyles.loadingText}></div>
                    <div className={noteStyles.contents} >
                        <div className={noteStyles.loadingText}></div>
                        <div className={noteStyles.loadingText}></div>
                        <div className={noteStyles.loadingText}></div>
                    </div>
                    <div className={noteStyles.buttonBox} >
                        <div className={noteStyles.loadingButton}>
                            <div className={noteStyles.loadingText}></div>
                        </div>
                        <div className={noteStyles.loadingButton}>
                            <div className={noteStyles.loadingText}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Notes() {
    const { data, requestStatus, error, addRecord, deleteRecord, updateRecord } = useRequestData();
    const { noteFilter } = useContext(NoteFilterContext);

    if (requestStatus === REQUEST_STATUS.LOADING) return <Loading numPlaceholders={5} />;
    if (requestStatus === REQUEST_STATUS.ERROR) throw error;

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

export default Notes;