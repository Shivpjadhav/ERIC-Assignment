import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import LikedProducts from "./pages/LikedProducts";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/add-product"
                    element={
                        <AddProduct />
                    }
                />

                <Route
                    path="/edit-product/:id"
                    element={
                        <EditProduct />
                    }
                />

                <Route
                    path="/liked-products"
                    element={
                        <LikedProducts />
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <Profile />
                    }
                />
                <Route
    path="/edit-profile"
    element={<EditProfile />}
/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;