import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CartTotals = () => {
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const updateTotalsFromCookie = () => {
      const cookieData = Cookies.get('cartItems');
      if (cookieData) {
        const cartItems = JSON.parse(cookieData);
        const newTotal = cartItems.reduce((acc, item) => acc + item.amount * item.price, 0);
        const newAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);
        setTotal(newTotal);
        setAmount(newAmount);
      }
    };

    updateTotalsFromCookie();
  }, []);

  const tax = total / 11;
  const shipping = total > 0 ? 5 : 0; // Assuming shipping is free if no items

  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Subtotal</span>
          <span className='font-medium'>${Math.round(total)}</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Shipping</span>
          <span className='font-medium'>${shipping}</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Tax 11%</span>
          <span className='font-medium'>${Math.round(tax)}</span>
        </p>
        {/* Order Total */}
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Order Total</span>
          <span className='font-medium'>${Math.round(total + shipping + tax)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;