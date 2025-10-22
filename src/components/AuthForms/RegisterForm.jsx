import style from "./Forms.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setNewUser }) {
    const { signUp } = useAuth();
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (formData.password !== formData.password2) throw new Error("Password doesnt match")

            await signUp(formData);

            nav('/dash')
        } catch (err) {
            console.log(err.message)

        }
    }

    const handleClick = () => {
        setNewUser(false);
    }
    return (
        <div className="forms">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    id:
                    <input
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="id"
                    />{" "}
                </label>

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="name"
                    />{" "}
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        minLength="6"
                    />{" "}
                </label>
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    minLength="6"
                />
                <input type="submit" value="Sign Up" />
            </form>
            <p>
                Already have an account? <button onClick={handleClick}>Sign In</button>
            </p>
        </div>
    );
}