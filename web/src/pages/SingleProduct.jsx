import axios from "axios";
import React, { useState } from "react";
import {
  QuantityInput,
  SelectSize,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

import { Link, useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";

export const singleProductLoader = async ({params}) => {
    const { id } = params;
    const response = await axios.get(`http://localhost:4300/api/product/${id}`);
    console.log(response.data);
    return { productData: response.data };
  };

const SingleProduct = () => {
    const { productData } = useLoaderData();
    const [quantity, setQuantity] = useState(1);
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const imageUrls = Array.from({ length: 5 }, (_, index) => `/images/subcat/${productData?.data.subcategory_id}/${String.fromCharCode(97 + index)}.jpg`);
    const [currentImage, setCurrentImage] = useState(0);
    const dispatch = useDispatch();
    const product = {
        id: productData?.data.ID,
        title: productData?.data.name,
        price: productData?.data.price,
        image: `/images/subcat/${productData?.data.subcategory_id}/a.jpg`,
        color: productData?.data.base_color,
        article_type: productData?.data.article_type,
        stock: productData?.data.quantity,
        amount: quantity,
        gender: productData?.data.gender,
        category: productData?.data.Category?.name,
        release_year: productData?.data.release_year,
        season: productData?.data.season,
        sid: productData?.data.subcategory_id
      };
      console.log(product.id);

      const addToWishlistHandler = async (product) => {
        try {
          const getResponse = await axios.get(
            `http://localhost:8080/user/${localStorage.getItem("id")}`
          );
          const userObj = getResponse.data;
    
          
          userObj.userWishlist = userObj.userWishlist || [];
    
          userObj.userWishlist.push(product);
    
          const postResponse = await axios.put(
            `http://localhost:8080/user/${localStorage.getItem("id")}`,
            userObj
          );
    
          
          store.dispatch(updateWishlist({ userObj }));
          toast.success("Product added to the wishlist!");
        } catch (error) {
          console.error(error);
        }
      };
    
      const removeFromWishlistHandler = async (product) => {
        const getResponse = await axios.get(
          `http://localhost:8080/user/${localStorage.getItem("id")}`
        );
        const userObj = getResponse.data;
    
        userObj.userWishlist = userObj.userWishlist || [];
    
        const newWishlist = userObj.userWishlist.filter(
          (item) => product.id !== item.id
        );
    
        userObj.userWishlist = newWishlist;
    
        const postResponse = await axios.put(
          `http://localhost:8080/user/${localStorage.getItem("id")}`,
          userObj
        );
    
        
        store.dispatch(removeFromWishlist({ userObj }));
        toast.success("Product removed from the wishlist!");
      };

  return (
    <>
      <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
        <div className="product-images flex flex-col justify-center max-lg:justify-start">
            <img
                src={imageUrls[currentImage]}
                className="pi-96 text-center border border-gray-600 cursor-pointer"
                alt={product.title}
                onClick={() => setCurrentImage((currentImage + 1) % imageUrls.length)} // Cycle through images
            />
            <div className="other-product-images mt-1 grid grid-cols-3 w-96 gap-y-1 gap-x-2 max-sm:grid-cols-2 max-sm:w-64">
                {imageUrls.map((imageUrl, index) => (
                <img
                    src={imageUrl}
                    key={nanoid()}
                    onClick={() => setCurrentImage(index)}
                    alt={product.title}
                    className="pi-32 border border-gray-600 cursor-pointer"
                />
                ))}
            </div>
        </div>
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {product.title}
          </h2>
          <p className="text-3xl text-error">
            ${product.price}
          </p>
          <div>
            <label htmlFor="Quantity" className="sr-only">
              {" "}
              Quantity{" "}
            </label>

            <div className="flex items-center gap-1">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => {
                if (loginState) {
                  dispatch(addToCart(product));
                } else {
                  toast.error(
                    "You must be logged in to add products to the cart"
                  );
                }
              }}
            >
              <FaCartShopping className="text-xl mr-1" />
              Add to cart
            </button>
          </div>
          <div className="other-product-info flex flex-col gap-x-2">
            <Link to={`/shop/category/${productData?.data.Category?.ID}`} className="badge bg-gray-700 badge-lg font-bold hover:bg-blue-500 text-white p-5 mt-2">
              Category: {product.category}
            </Link>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Type: {product.article_type}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Color: {product.color}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Gender: {product.gender}
            </div>
            <div
              className={
                product.stock
                  ? "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                  : "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
              }
            >
              In Stock: {product.stock ? "Yes" : "No"}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Season: {product.season}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Release Year:{" "}
              {product.release_year}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;