import React from "react";
import noxPhone from "../assets/NoxPhoneProductCard.png";
import noxBook from "../assets/NoxPhoneBanner.png";
import noxWatch from "../assets/NoxWatchBanner.png";
import noxBud from "../assets/NoxBudsBanner.png";
import noxView from "../assets/NoxViewBanner.png";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const productImages = {
    1: noxBook,
    2: noxPhone,
    3: noxWatch,
    4: noxBud,
    5: noxView,
  };

  const navigate = useNavigate();

  const addToCart = async (product) => {
    await fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.productId,
        productName: product.productName,
        productPrice: product.productPrice,
        quantity: 1,
      }),
    });
  };

  const addToFavourites = async (product) => {
    await fetch("http://localhost:3001/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.productId,
        productName: product.productName,
        productPrice: product.productPrice,
        quantity: 1,
      }),
    });
  };

  return (
    <div className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-[550px]">
      <div className="flex items-stretch">
        {/* IMAGE */}
        <div className="bg-neutral-100 flex items-center justify-center self-stretch">
          <div className="aspect-[9/16] w-[250px] h-full flex items-center">
            <img
              src={productImages[product.categoryId]}
              alt={product.productName}
              className="max-h-full w-full object-contain"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-white p-4 w-[300px] flex flex-col gap-3">
          <div className="border border-gray-200 rounded-lg px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.productName}
            </h3>
          </div>

          <div className="border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-gray-600 text-sm">
              {product.productDescription}
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-lg font-medium">{product.productPrice}</span>
            <button
              className="text-sm hover:underline"
              onClick={() => navigate("/product-detail/" + product.productId)}
            >
              Learn more →
            </button>
          </div>
          <button
            onClick={async () => await addToCart(product)}
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50"
          >
            Add to Cart
          </button>
          <button
            onClick={async () => await addToFavourites(product)}
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50"
          >
            Add to Favourites
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
