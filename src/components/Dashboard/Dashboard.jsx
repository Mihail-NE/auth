import s from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <div className={s.successIcon}>✓</div>
                <h1 className={s.title}>Register success!</h1>
                <p className={s.message}>
                    Welcome! Your account has been successfully created.
                </p>
                <div className={s.additionalInfo}>
                    <span className={s.checkmark}>✓</span>
                    <span>Email verified</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
