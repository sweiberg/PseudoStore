/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { nanoid } from "nanoid";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // /posts?title=json-server&author=typicode
  // GET /posts?_sort=views&_order=asc
  // GET /posts/1/comments?_sort=votes&_order=asc

  let mydate = Date.parse(params.date);

  if (mydate && !isNaN(mydate)) {
    // The date is valid
    mydate = new Date(mydate).toISOString();
  } else {
    mydate = "";
  }

  const filterObj = {
    brand: params.brand ?? "all",
    category: params.category ?? "all",
    date: mydate ?? "",
    gender: params.gender ?? "all",
    price: params.price ?? "all",
    search: params.search ?? "",
    current_page: Number(params.page) || 1
  };

  // set params in get apis
  let parameter = (`?_start=${(filterObj.current_page - 1) * 10}&_limit=10`) + // pre defined that limit of response is 10 & page number count 1
    (filterObj.brand !== 'all' ? `&brandName=${filterObj.brand}` : "") +
    (filterObj.category !== 'all' ? `&category=${filterObj.category}` : "") +
    (filterObj.gender !== 'all' ? `&gender=${filterObj.gender}` : ``) +
    ((filterObj.search != '') ? `&q=${encodeURIComponent(filterObj.search)}` : ``) +
    (filterObj.price !== 'all' ? `&price=${filterObj.price}` : ``) +
    (filterObj.date ? `&productionDate=${filterObj.date}` : ``) // It only matched exact for the date and time. 

  try {
    const response = await axios(
      `http://localhost:4300/api/shop${parameter}`

    );
    let data = response.data.data;
    console.log(response.data)
    // sorting in descending order
    if (filterObj.order && !(filterObj.order === "asc" || filterObj.order === "price low")) data.sort((a, b) => b.price.current.value - a.price.current.value)
    return { productsData: data, productsLength: data.length, page: filterObj.current_page };
  } catch (error) {
    console.log(error.response);
  }
  // /posts?views_gte=10

  return null;
};

const Shop = () => {

  const productLoaderData = useLoaderData();


  return (
    <>
      <div className="max-w-7xl mx-auto mt-5">
        <Filters />
        {productLoaderData.productsData.length === 0 && <h2 className="text-accent-content text-center text-4xl my-10">No products found for this filter</h2>}
        <div className="grid grid-cols-4 mt-5 gap-y-6 gap-x-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={nanoid()}
                id={product.ID}
                title={product.name}
                image={`/images/subcat/${product.subcategory_id}/a.jpg`}
                price={product.price}
              />
            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
