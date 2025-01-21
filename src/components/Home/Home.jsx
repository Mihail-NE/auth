import { Link } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.title}>Secure Auth Demo</h1>
                <div className={s.buttons}>
                    <Link to="/signup">
                        <button className={s.button}>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button className={s.button}>Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
