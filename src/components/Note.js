import styles from './modules/Note.module.css';

function Note({ note }) {
    return (
      <article className={styles.noteContainer} >
        <span className={styles.title} >{note.title}</span>
        <div className={styles.contents} >{note.contents}</div>
        <div className={styles.buttonBox} >
            <button className={styles.button} >edit</button>
            <button className={styles.button} >delete</button>
        </div>
      </article>
    );
  }

  export default Note;