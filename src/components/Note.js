import styles from './modules/Note.module.css';
import { useState } from 'react';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function EditButton({ note, updateRecord }) {
  const [isModalOpen, setIsModalOpen] = useState();
  const [title, setTitle] = useState(note.title);
  const [contents, setContents] = useState(note.contents);
  const [isPendingEdit, setIsPendingEdit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    let newNote = {
      id: note.id,
      title,
      contents,
    };

    const callBack = () => { setIsPendingEdit(false) };

    updateRecord(newNote, callBack);
    setIsModalOpen(false);
    setIsPendingEdit(true);
  }

  function handleClose() {
    setTitle(note.title);
    setContents(note.contents);

    setIsModalOpen(false);
  }

  return (
    <>
      <button className={styles.button}
        onClick={() => setIsModalOpen(true)}
        disabled={isPendingEdit}>
        {isPendingEdit ? <LoadingSpinner /> : "Edit"}
      </button>
      <Modal isOpen={isModalOpen}
        handleClose={handleClose}
        heading='Edit Note'>
        <form className={styles.editNoteForm}
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
          <div className={styles.buttonBox}>
            <input
              className={styles.button}
              type="submit" value="Submit" />
            <button
              className={styles.button}
              onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function DeleteButton({ id, deleteRecord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);

  function handleDelete() {
    const callBack = () => { setIsPendingDelete(false) };

    setIsPendingDelete(true);
    deleteRecord(id, callBack);
    setIsModalOpen(false);
  }

  return (
    <>
      <button className={styles.button}
        onClick={() => setIsModalOpen(true)}
        disabled={isPendingDelete}>
        {isPendingDelete ? <LoadingSpinner /> : 'delete' }
      </button>
      <Modal isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        heading='Are you sure?'>
        <div className={styles.buttonBox}>
          <button className={styles.button}
            onClick={handleDelete}>delete</button>
          <button className={styles.button}
            onClick={() => setIsModalOpen(false)}>cancel</button>
        </div>
      </Modal>
    </>
  );
}

function Note({ note, deleteRecord, updateRecord }) {
  return (
    <article className={styles.noteContainer} >
      <span className={styles.title} >{note.title}</span>
      <div className={styles.contents} >{note.contents}</div>
      <div className={styles.buttonBox} >
        <EditButton note={note} updateRecord={updateRecord} />
        <DeleteButton id={note.id} deleteRecord={deleteRecord} />
      </div>
    </article>
  );
}

export default Note;