import React from "react";
import productCard1 from "../assets/NoxPhoneProductCard.png";

function ProductCard({ product }) {
  return (
    <div className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-[550px]">
      <div className="flex items-stretch">
        {/* IMAGE */}
        <div className="bg-neutral-100 flex items-center justify-center self-stretch">
          <div className="aspect-[9/16] w-[250px] h-full flex items-center">
            <img
              src={productCard1}
              alt="Nox Phone X"
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
            <button className="text-sm hover:underline">Learn more →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
