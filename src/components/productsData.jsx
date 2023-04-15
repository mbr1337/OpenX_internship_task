import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/productDataStyle.scss'
import { productsApi } from "../api/apiEndpoints";

function ProductsData() {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const calculateCategoriesTotalValue = (productsData) => {
        const categories = {};
        productsData.forEach(product => {
            if (categories.hasOwnProperty(product.category)) {
                categories[product.category] += product.price;
            } else {
                categories[product.category] = product.price;
            }
        });
        return categories;
    };


    useEffect(() => {
        axios
            .get(productsApi)
            .then((response) => {
                setProductsData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(true);
            });

    }, []);

    const categories = calculateCategoriesTotalValue(productsData);

    return (
        <section id="cartsData">
            {loading ? (
                <div>Loading Product data...</div>
            ) : (
                <>
                    <h2><u>Products data</u></h2>
                    <table className="product-data-table">
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
                            {productsData.map(({ id, title, price, description, category, image, rating }) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>${price}</td>
                                    <td>{description}</td>
                                    <td>{category}</td>
                                    <td>
                                        <img src={image} alt={title} width="50" />
                                    </td>
                                    <td>
                                        {rating.rate} ({rating.count})
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div id="all_product_categories_and_total_value_of_gives_category">
                        <h2>Product categories and the total value of products of a given category</h2>
                        <ul>
                            {Object.keys(categories).map(category => (
                                <li key={category}>
                                    {category}: <u>${categories[category].toFixed(2)}</u>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </section>
    );
}

export default ProductsData;