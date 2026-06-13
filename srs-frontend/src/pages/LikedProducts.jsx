import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import './LikedProducts.css';

function LikedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLikedProducts();
    }, []);

    const fetchLikedProducts = async () => {
        try {
            setLoading(true);
            const res = await API.get("/products/liked");
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="liked-products-container">
            <Navbar />
            <div className="liked-products-content">
                <div className="liked-products-header">
                    <h1>Liked Products</h1>
                    {!loading && products.length > 0 && (
                        <div className="product-count">
                            ❤️ {products.length} liked product{products.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="loading-state">Loading liked products</div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <span className="heart-emoji">💔</span>
                        <p>No liked products yet</p>
                        <small>Start liking products to see them here!</small>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product._id} className="liked-product-card">
                                <img src={product.image} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LikedProducts;