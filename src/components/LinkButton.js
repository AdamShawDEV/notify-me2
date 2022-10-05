import styles from './modules/LinkButton.module.css';

function LinkButton({ children, onClick }) {

    return (
        <button className={styles.linkButton} onClick={onClick}>
            {children}
        </button>
    )
}

export default LinkButton;