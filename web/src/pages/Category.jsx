import React, { useEffect } from "react";
import "../styles/Landing.css";
import { ProductElement, SectionTitle, Pagination } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const categoryLoader = async ({params}) => {
  try {
    const { id } = params;
    const response = await axios(`http://localhost:4300/api/category/${id}/p/1`);
    console.log(response.data);
    return { category: response.data.data };  // Accessing the nested 'data' that contains the product array
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [] };  // Return an empty array in case of error
  }
};

const Category = () => {
  const { category } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <SectionTitle title={`${category.name}`} />
      <div className="selected-products">
        <div className="selected-products-grid max-w-7xl mx-auto">
          {Array.isArray(category.products) ? (
            category.products.map((product) => (
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
      <Pagination />
    </main>
  );
};

export default Category;
