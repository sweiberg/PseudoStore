import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const landingLoader = async () => {
  try {
    const response = await axios(`http://localhost:4300/api/product/popular/12`);
    console.log(response.data);
    return { products: response.data.data };  // Accessing the nested 'data' that contains the product array
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [] };  // Return an empty array in case of error
  }
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <Hero />

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {Array.isArray(products) ? (
            products.map((product) => (
              <ProductElement
                key={product.ID}  // Corrected to use the right property 'ID'
                id={product.ID}
                image={`/images/subcat/${product.subcategory_id}/a.jpg`}
                title={product.name}  // Assuming the product structure includes a 'name' field
                price={product.price}
              />
            ))
          ) : (
            <p>No products found or data is still loading.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Landing;
