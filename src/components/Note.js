import styles from './modules/Note.module.css';
import { useState } from 'react';
import Modal from './Modal';
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai';
import Button from './Button';

const PENDING_ACTION = {
  EDIT: 'edit',
  DELETE: 'delete',
  NONE: 'none',
};

function EditButton({ note, updateRecord, pendingAction, setPendingAction }) {
  const [isModalOpen, setIsModalOpen] = useState();
  const [title, setTitle] = useState(note.title);
  const [alignment, setAlignment] = useState(note.alignment);
  const [contents, setContents] = useState(note.contents);

  function handleSubmit(e) {
    e.preventDefault();

    let newNote = {
      id: note.id,
      title,
      contents,
      alignment,
    };

    const callBack = () => { setPendingAction(PENDING_ACTION.NONE) };

    updateRecord(newNote, callBack);
    setIsModalOpen(false);
    setPendingAction(PENDING_ACTION.EDIT);
  }

  function handleClose() {
    setTitle(note.title);
    setContents(note.contents);
    setAlignment(note.alignment)

    setIsModalOpen(false);
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={pendingAction !== PENDING_ACTION.NONE}
        pendingOperation={pendingAction === PENDING_ACTION.EDIT}>
        edit
      </Button>
      <Modal isOpen={isModalOpen}
        handleClose={handleClose}>
        <h1 className={styles.title}>Edit Note</h1>
        <form className={styles.editNoteForm}
          onSubmit={e => handleSubmit(e)} >
          <label>Title:</label>
          <input className={styles.inputText}
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required />
          <label>Contents:</label>
          <div className={styles.radioButtonBox}>
            <label>
              <input className={styles.radioButtonInput}
                name="alignment" type="radio" value="left"
                checked={alignment === 'left'}
                onChange={(e) => setAlignment(e.target.value)} />
              <div className={styles.radioButton}>
                <AiOutlineAlignLeft />
              </div>
            </label>
            <label>
              <input className={styles.radioButtonInput}
                name="alignment" type="radio" value="center"
                checked={alignment === 'center'}
                onChange={(e) => setAlignment(e.target.value)} />
              <div className={styles.radioButton}>
                <AiOutlineAlignCenter />
              </div>
            </label>
            <label>
              <input className={styles.radioButtonInput} name="alignment"
                type="radio" value="right" checked={alignment === 'right'}
                onChange={(e) => setAlignment(e.target.value)} />
              <div className={styles.radioButton}>
                <AiOutlineAlignRight />
              </div>
            </label>
          </div>
          <textarea
            className={`${styles.inputText} ${styles.noteContentsInput}`}
            onChange={e => setContents(e.target.value)}
            value={contents}
            required
            style={{ textAlign: alignment }} />
          <div className={styles.buttonBox}>
            <Button>
              submit
            </Button>
            <Button onClick={handleClose}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>
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