import {
    Link,
    useNavigate
} from "react-router-dom";
import './Navbar.css';
function Navbar() {

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate(
            "/login"
        );

    };

    return (

        <nav>

            <Link to="/">
                Home
            </Link>

            {" | "}

            <Link
                to="/add-product"
            >
                Add Product
            </Link>

            {" | "}

            <Link
                to="/liked-products"
            >
                Liked Products
            </Link>

            {" | "}

            <Link
                to="/profile"
            >
                Profile
            </Link>

            {" | "}

            <button
                onClick={logout}
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;