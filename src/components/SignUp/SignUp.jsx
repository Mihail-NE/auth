import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import s from "./SignUp.module.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Ошибка регистрации:", error.message);
        }
    };

    return (
        <div className={s.container}>
            <div className={s.content}>
                <h2 className={s.title}>Create Account</h2>

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
                        Have account?{" "}
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
