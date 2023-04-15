import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/cartDataStyle.scss';
import { usersApi, productsApi, cartsApi } from "../api/apiEndpoints";

function CartsData() {
    const [cartsData, setCartsData] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const calculateTotalValue = (cart) => {
        if (!cart || !cart.products) {
            return 0;
        }

        return cart.products.reduce((totalValue, product) => {
            const matchingProduct = products.find((p) => p.id === product.productId);
            return totalValue + (matchingProduct ? matchingProduct.price * product.quantity : 0);
        }, 0);
    };

    const cartWithHighestValue = cartsData.reduce((prevCart, currentCart) => {
        const prevCartTotalValue = prevCart && prevCart.products ? calculateTotalValue(prevCart) : 0;
        const currentCartTotalValue = calculateTotalValue(currentCart);
        return prevCartTotalValue > currentCartTotalValue ? prevCart : currentCart;
    }, {});

    const highestCartValue = calculateTotalValue(cartWithHighestValue);
    const userIdOfHighestCartValue = cartWithHighestValue.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartsResponse = await axios.get(cartsApi);
                setCartsData(cartsResponse.data);
                const productsResponse = await axios.get(productsApi);
                const extractedProducts = productsResponse.data.map(product => ({
                    id: product.id,
                    price: product.price
                }));
                setProducts(extractedProducts);
                const usersResponse = await axios.get(usersApi);
                const userWithHighestCartValue = usersResponse.data.find(
                    (user) => user.id === userIdOfHighestCartValue
                );
                setUser(userWithHighestCartValue);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [userIdOfHighestCartValue]);

    return (
        <section id="cartsData">
            {loading ? (
                <div>Loading Product data...</div>
            ) : (
                <>
                    <h2><u>Carts data</u></h2>
                    <table className="cart-data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Date</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartsData.map(cart => (
                                <tr key={cart.id}>
                                    <td>{cart.id}</td>
                                    <td>{cart.userId}</td>
                                    <td>{new Date(cart.date).toLocaleDateString()}</td>
                                    <td>
                                        {cart.products.map(product => (
                                            <div key={product.productId}>
                                                {product.productId}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {cart.products.map(product => (
                                            <div key={product.productId}>
                                                {product.quantity}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div id="customer_cart_with_the_highest_value">
                        <h1>Cart with Highest Value</h1>
                        {user ? (
                            <div>
                                <p>Cart ID: <b>{cartWithHighestValue.id}</b></p>
                                <p>User ID: <b>{userIdOfHighestCartValue}</b></p>
                                <p>User Name: <b>{user.name.firstname} {user.name.lastname}</b></p>
                                <p>Value: <b><u>${highestCartValue.toFixed(2)}</u></b></p>
                            </div>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}

export default CartsData;

