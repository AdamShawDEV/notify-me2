import styles from './modules/Note.module.css';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import AddEditNote from './AddEditNote';
import { PENDING_ACTION } from '../consts';

function EditButton({ note, updateRecord, pendingAction, setPendingAction }) {
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={pendingAction !== PENDING_ACTION.NONE}
        pendingOperation={pendingAction === PENDING_ACTION.EDIT_ADD}>
        edit
      </Button>
      {isModalOpen && <AddEditNote
        note={note}
        setPendingAction={setPendingAction}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateRecord={updateRecord} />}
    </>
  );
}

function DeleteButton({ id, deleteRecord, pendingAction, setPendingAction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDelete() {
    const callBack = () => { setPendingAction(PENDING_ACTION.NONE) };

    setPendingAction(PENDING_ACTION.DELETE);
    deleteRecord(id, callBack);
    setIsModalOpen(false);
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={pendingAction !== PENDING_ACTION.NONE}
        pendingOperation={pendingAction === PENDING_ACTION.DELETE}>
        delete
      </Button>
      <Modal isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}>
        <h1 className={styles.title}>Are you  sure?</h1>
        <div className={styles.buttonBox}>
          <Button
            type='delete'
            onClick={handleDelete}>
            delete
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}>
            cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

function Note({ note, deleteRecord, updateRecord }) {
  const [pendingAction, setPendingAction] = useState(PENDING_ACTION.NONE);

  return (
    <article className={styles.noteContainer} >
      <span className={styles.title} >{note.title}</span>
      <div style={{ textAlign: note.alignment }} className={styles.contents} >{note.contents}</div>
      <div className={styles.buttonBox} >
        <EditButton note={note} updateRecord={updateRecord} pendingAction={pendingAction} setPendingAction={setPendingAction} />
        <DeleteButton id={note.id} deleteRecord={deleteRecord} pendingAction={pendingAction} setPendingAction={setPendingAction} />
      </div>
    </article>
  );
}

export default Note;