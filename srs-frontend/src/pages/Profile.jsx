import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [likedCount, setLikedCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        try {
            const likedRes = await API.get("/products/liked");
            setLikedCount(likedRes.data.length);
            
            const productsRes = await API.get("/products");
            setProductCount(productsRes.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Get initials for avatar
    const getInitials = () => {
        if (user?.name) {
            return user.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return 'U';
    };

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-content">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {getInitials()}
                    </div>
                    <h2>User Profile</h2>
                </div>

                <div className="profile-info">
                    <div className="profile-field">
                        <strong>Name:</strong>
                        <span> {user?.name || 'Not provided'}</span>
                    </div>
                    <div className="profile-field">
                        <strong>Email:</strong>
                        <span> {user?.email || 'Not provided'}</span>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">{productCount}</span>
                        <span className="stat-label">Total Products</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{likedCount}</span>
                        <span className="stat-label">Liked Products</span>
                    </div>
                </div>

                <button 
                    className="edit-profile-button"
                    onClick={() => navigate("/edit-profile")}
                >
                    ✏️ Edit Profile
                </button>

                <button 
                    className="logout-button"
                    onClick={logout}
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;