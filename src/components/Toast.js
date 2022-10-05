import Portal from "./Portal";
import styles from './modules/Toast.module.css';
import { useEffect } from "react";

function Toast({ toast, setToast, timoutTime = 2000 }) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setToast(curr => { return { ...curr, display: false }; })
        }, timoutTime);

        return () => clearTimeout(timeoutId);

        // eslint-disable-next-line
    }, []);

    return (
        <Portal wrapperId={'toast-container'}>
            <div className={styles.toast}>
                {toast.message}
            </div>
        </Portal>
    );
}

export default Toast;