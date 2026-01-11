import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noxPhone from "../assets/NoxPhoneProductCard.png";
import noxBook from "../assets/NoxPhoneBanner.png";
import noxWatch from "../assets/NoxWatchBanner.png";
import noxBud from "../assets/NoxBudsBanner.png";
import noxView from "../assets/NoxViewBanner.png";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();

        const getProduct = data.find((item) => item.productId == id);

        setProduct(getProduct);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    getProducts();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const productImages = {
    1: noxBook,
    2: noxPhone,
    3: noxWatch,
    4: noxBud,
    5: noxView,
  };

  return (
    <main className="min-h-screen bg-neutral-100 px-8 py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* PHONE VISUAL */}
        <div className="relative flex justify-center">
          {/* WAVE / GLOW BEHIND PHONE */}
          <div
            className="absolute w-[520px] h-[520px] rounded-full blur-3xl"
            style={{
              background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(30,30,30,0.9),
              rgba(10,10,10,0.6) 40%,
              rgba(0,0,0,0.2) 65%,
              transparent 70%
            )
          `,
            }}
          />

          <div
            className="absolute w-[420px] h-[420px] rounded-full blur-2xl translate-x-10 translate-y-10"
            style={{
              background: `
            radial-gradient(
              circle at 70% 70%,
              rgba(60,60,60,0.6),
              rgba(20,20,20,0.4) 50%,
              transparent 70%
            )
          `,
            }}
          />

          {/* PHONE IMAGE */}
          <img
            src={productImages[product.categoryId]}
            alt={product.productName}
            className="relative z-10 w-[320px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-14">
          <span className="text-xs tracking-[0.4em] uppercase text-neutral-500">
            {product.categoryName}
          </span>

          <h1 className="text-[3.4rem] leading-tight font-medium text-neutral-900">
            {product.productName}
          </h1>

          <p className="text-neutral-600 leading-relaxed max-w-xl">
            {product.productDescription}
          </p>

          {/* FEATURES */}
          <div className="flex flex-col gap-5">
            {product.productFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-2 h-px w-8 bg-neutral-400"></div>
                <span className="text-neutral-700 text-sm leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* PRICE + CTA */}
          <div className="flex items-center justify-between pt-10 border-t border-neutral-300">
            <span className="text-3xl font-medium text-neutral-900">
              ${product.productPrice}
            </span>

            <button className="px-12 py-3 text-sm font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-100 transition">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
