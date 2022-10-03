import LoadingSpinner from "./LoadingSpinner";
import styles from './modules/Button.module.css';

function Button({ onClick, disabled, pendingOperation, children, type = 'none' }) {
    return (
      <button className={styles.button}
        style={type === 'delete' ? {backgroundColor: 'red'} : {}}
        onClick={onClick}
        disabled={disabled}>
        {pendingOperation ? <LoadingSpinner /> : children}
      </button>
    );
  }

  export default Button;