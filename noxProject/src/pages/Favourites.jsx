import React, { useState, useEffect } from "react";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";

function Favourites() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/favourites");
        const data = await response.json();

        const gettingItems = data.filter((item) => item);

        setItems(gettingItems);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchItems();
  }, []);

  const handleRemove = async (item) => {
    try {
      await fetch(`http://localhost:3001/favourites/${item.id}`, {
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
        <h1 className="text-4xl font-bold mb-8 pt-6">Favourites</h1>
        <div className="flex flex-col gap-4">
          <div>
            {items.length === 0 ? (
              <div className="flex flex-col items-start justify-start p-5 bg-gray-800 text-white rounded-lg shadow-md">
                <p>
                  You don't have any favourites,{" "}
                  <span className="font-bold text-red-500">YET!</span> Want to
                  buy some Nox experience?
                </p>
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
              <div>
                {items.map((item) => (
                  <CartProduct
                    key={item.id}
                    item={item}
                    onIncrease={null}
                    onDecrease={null}
                    onRemove={handleRemove}
                    isCart={false}
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

export default Favourites;
