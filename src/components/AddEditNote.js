import { useState } from "react";
import Modal from "./Modal";
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai';
import styles from './modules/AddEditNote.module.css';
import Button from "./Button";
import { PENDING_ACTION } from "../consts";


function AddEditNote({ note, setPendingAction, updateRecord, addRecord, isModalOpen, setIsModalOpen }) {
  const [title, setTitle] = useState(note ? note.title : '');
  const [contents, setContents] = useState(note ? note.contents : '');
  const [alignment, setAlignment] = useState(note ? note.alignment : 'left');

  function handleSubmit(e) {
    e.preventDefault();

    let newNote = {
      id: note ? note.id : generateId(16),
      title,
      contents,
      alignment,
    };

    const callBack = () => { setPendingAction(PENDING_ACTION.NONE) };

    note ? updateRecord(newNote, callBack) : addRecord(newNote, callBack);
    setPendingAction(PENDING_ACTION.EDIT_ADD);
    handleClose();
  }

  function handleClose() {
    setTitle(note ? note.title : '');
    setContents(note ? note.contents : '');
    setAlignment(note ? note.alignment : '')

    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isModalOpen}
      handleClose={handleClose}>
      <h1 className={styles.title}>{note ? 'Edit Note' : 'Add New Note'}</h1>
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
  )
}

function generateId(idLength) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ1234567890';
  let output = '';

  for (let i = 0; i < idLength; i++) {
    output += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return output;
}

export default AddEditNote;