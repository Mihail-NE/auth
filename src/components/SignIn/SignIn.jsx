import { useState } from "react";
import {
    signInWithEmailAndPassword,
    browserLocalPersistence,
    setPersistence,
} from "firebase/auth";
import { auth } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import s from "./SignIn.module.css";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("Успешный вход:", userCredential.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("Ошибка входа:", error.message);
        }
    };

    return (
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.title}>Вход</h1>
                <form onSubmit={handleSubmit} className={s.form}>
                    <input
                        className={s.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className={s.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                    />
                    <button className={s.button} type="submit">
                        Войти
                    </button>
                </form>
                <div className={s.buttons}>
                    <span className={s.span}>
                        Don`t have an account?{" "}
                        <button
                            className={s.buttonIn}
                            onClick={() => navigate("/signup")}
                        >
                            Crete account
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
