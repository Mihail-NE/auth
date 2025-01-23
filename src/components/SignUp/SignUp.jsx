import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import s from "./SignUp.module.css";

const SignUp = () => {
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

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("An account with this email already exists.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address.");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak.");
                    break;
                default:
                    setError("Registration error: " + error.message);
            }
        }
    };

    return (
        <div className={s.container}>
            <div className={s.content}>
                <h2 className={s.title}>Create Account</h2>
                {error && <div className={s.error}>{error}</div>}
                <form onSubmit={handleSubmit} className={s.form}>
                    <div className={s.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className={s.input}
                            required
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={s.input}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className={s.buttons}>
                        <button type="submit" className={s.button}>
                            Create account
                        </button>
                    </div>
                </form>
                <div className={s.buttons}>
                    <span className={s.span}>
                        Have an account?{" "}
                        <button
                            className={s.buttonIn}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
