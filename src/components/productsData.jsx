import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsData() {
    const productsApi = `https://fakestoreapi.com/products`;
    const [productsData, setProductsData] = useState([]);
    const categories = {};
    useEffect(() => {
        axios
            .get(productsApi)
            .then((response) => {
                setProductsData(response.data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);


    // Loop through each product and calculate the total value for each category
    productsData.forEach(product => {
        if (categories.hasOwnProperty(product.category)) {
            categories[product.category] += product.price;
        } else {
            categories[product.category] = product.price;
        }
    });

    return (
        <section id="cartsData">
            <h2><u>Carts data</u></h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>
                                <img src={product.image} alt={product.title} width="50" />
                            </td>
                            <td>
                                {product.rating.rate} ({product.rating.count})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="all_product_categories_and_total_value_of_gives_category">
                <h2>Product categories and the total value of products of a given category</h2>
                <ul>
                    {/* Render each category and its total value */}
                    {Object.keys(categories).map(category => (
                        <li key={category}>
                            {category}: ${categories[category].toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
}

export default ProductsData;