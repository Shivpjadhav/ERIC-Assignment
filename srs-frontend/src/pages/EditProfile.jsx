import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import './EditProfile.css';

function EditProfile() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [originalEmail, setOriginalEmail] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/users/profile");
            setForm({
                name: res.data.name,
                email: res.data.email
            });
            setOriginalEmail(res.data.email);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await API.put("/users/profile", form);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Profile Updated Successfully!");
            navigate("/profile");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    // Get initials for avatar
    const getInitials = () => {
        if (form.name) {
            return form.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return 'U';
    };

    return (
        <div className="edit-profile-container">
            <Navbar />
            <div className="edit-profile-content">
                <div className="edit-profile-header">
                    <h2>Edit Profile</h2>
                    <p className="edit-profile-subtitle">Update your personal information</p>
                </div>

                <div className="avatar-section">
                    <div className="profile-avatar-edit">
                        <div className="avatar-image">
                            {getInitials()}
                        </div>
                        <div className="avatar-edit-icon">
                            📷
                        </div>
                    </div>
                </div>

                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                className="edit-profile-input"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value
                                    })
                                }
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="input-helper">
                            This is your public display name
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon">📧</span>
                            <input
                                type="email"
                                className="edit-profile-input"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    })
                                }
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div className="input-helper">
                            We'll send notifications to this email
                        </div>
                    </div>

                    <div className="button-group">
                        <button 
                            type="submit" 
                            className={`update-button ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating' : 'Update Profile'}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;