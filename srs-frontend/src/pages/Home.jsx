import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await API.get("/products");
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-content">
                <div className="home-header">
                    <h1>Products</h1>
                    {!loading && products.length > 0 && (
                        <div className="product-count">
                            {products.length} product{products.length !== 1 ? 's' : ''} available
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="loading-state">Loading products</div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <span className="emoji">📦</span>
                        <p>No products available</p>
                        <small style={{ color: '#C4B5FD' }}>Start by adding your first product!</small>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                refresh={fetchProducts}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;