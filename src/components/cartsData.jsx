import React, { useEffect, useState } from "react";
import axios from "axios";

function CartsData() {
    const cartsApi = `https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07`;
    const productsApi = `https://fakestoreapi.com/products`;
    const usersApi = `https://fakestoreapi.com/users`;
    const [cartsData, setCartsData] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);


    // Find the cart with the highest value
    const cartWithHighestValue = cartsData.reduce((prevCart, currentCart) => {
        const prevCartTotalValue = prevCart && prevCart.products ? prevCart.products.reduce((prevTotal, product) => {
            const matchingProduct = products.find((p) => p.id === product.productId);
            return prevTotal + (matchingProduct ? matchingProduct.price * product.quantity : 0);
        }, 0) : 0;

        const currentCartTotalValue = currentCart.products.reduce((currentTotal, product) => {
            const matchingProduct = products.find((p) => p.id === product.productId);
            return currentTotal + (matchingProduct ? matchingProduct.price * product.quantity : 0);
        }, 0);

        return prevCartTotalValue > currentCartTotalValue ? prevCart : currentCart;
    }, {});


    // Determine the value of the cart with the highest value
    const highestCartValue = cartWithHighestValue.products ? cartWithHighestValue.products.reduce(
        (totalValue, product) => {
            const matchingProduct = products.find((p) => p.id === product.productId);
            if (matchingProduct) {
                return totalValue + matchingProduct.price * product.quantity;
            } else {
                return totalValue;
            }
        },
        0
    ) : 0;

    // Get the user ID of the cart with the highest value
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [cartsApi, productsApi, userIdOfHighestCartValue, usersApi]);



    return (
        <section id="cartsData">
            <h2><u>Carts data</u></h2>
            <table>
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
                        <p>Cart ID: {cartWithHighestValue.id}</p>
                        <p>User ID: {userIdOfHighestCartValue}</p>
                        <p>User Name: {user.name.firstname} {user.name.lastname}</p>
                        <p>Value: ${highestCartValue.toFixed(2)}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}

            </div>

        </section>
    );
}

export default CartsData;