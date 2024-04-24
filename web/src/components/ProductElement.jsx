import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

const ProductElement = ({ id, title, image, price, brandName }) => {
  const product = {
    id, title, image, price, brandName, amount: 1
  };
  return (
    <div className="max-w-2xl">
      <div className="bg-opacity-5 bg-white btn-ghost h-full shadow-lg rounded-lg max-w-sm bg-base-100">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="st-96 rounded-t-lg p-8"
            src={`${image}`}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-accent-content">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
