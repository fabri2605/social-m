import styles from './Spinner.module.css';

export const Spinner = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div className={styles.ldshourglass}></div>
        </div>
    );
};
