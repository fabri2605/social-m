import styles from './Spinner.module.css';

export const Error = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
            }}
        >
            <div style={{textAlign: 'center'}}>
                <h1 className='text-danger'>There has been some error..</h1>
            </div>
            <h3 className='text-warning'>Try reloading the page!</h3>
        </div>
    );
};
