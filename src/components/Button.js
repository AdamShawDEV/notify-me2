import LoadingSpinner from "./LoadingSpinner";
import styles from './modules/Button.module.css';

function Button({ onClick, disabled, pendingOperation, children }) {
    return (
      <button className={styles.button}
        onClick={onClick}
        disabled={disabled}>
        {pendingOperation ? <LoadingSpinner /> : children}
      </button>
    );
  }

  export default Button;