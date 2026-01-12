import React, { useState, useEffect } from "react";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/cart");
        const data = await response.json();

        const gettingItems = data.filter((item) => item);

        setItems(gettingItems);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchItems();
  }, []);

  const handleIncrease = async (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };

    try {
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: updatedItem.quantity }),
      });

      setItems((prev) => prev.map((x) => (x.id === item.id ? updatedItem : x)));
    } catch (error) {
      console.error("Increase error:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;

    const updatedItem = { ...item, quantity: item.quantity - 1 };

    try {
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: updatedItem.quantity }),
      });

      setItems((prev) => prev.map((x) => (x.id === item.id ? updatedItem : x)));
    } catch (error) {
      console.error("Decrease error:", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((x) => x.id !== item.id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 pt-6">Cart</h1>
        <div>
          <div>
            {items.length === 0 ? (
              <div className="flex flex-col items-start justify-start p-5 bg-gray-800 text-white rounded-lg shadow-md">
                <p>Your Cart is Empty. Want to buy some Nox experience?</p>
                <div className="mt-3 flex items-left justify-left">
                  <p className="left pr-2">Go to:</p>
                  <button
                    className="text-sm hover:underline"
                    onClick={() => navigate("/")}
                  >
                    Home →
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartProduct
                    key={item.id}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                    isCart={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
