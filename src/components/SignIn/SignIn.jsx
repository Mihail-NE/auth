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
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    setError("No account found with this email.");
                    break;
                case "auth/invalid-credential":
                    setError("Incorrect password or email.");
                    break;

                default:
                    setError("Login error: " + error.message);
            }
        }
    };

    return (
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.title}>Login</h1>
                {error && <div className={s.error}>{error}</div>}
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
                        placeholder="Password"
                    />
                    <button className={s.button} type="submit">
                        Login
                    </button>
                </form>
                <div className={s.buttons}>
                    <span className={s.span}>
                        Don`t have an account?{" "}
                        <button
                            className={s.buttonIn}
                            onClick={() => navigate("/signup")}
                        >
                            Create account
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
