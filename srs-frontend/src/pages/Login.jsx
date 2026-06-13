import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="input-icon">📧</span>
                        <input
                            type="email"
                            className="login-input"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">🔒</span>
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in' : 'Login'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;