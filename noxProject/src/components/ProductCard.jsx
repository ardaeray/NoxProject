import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdd from "../hooks/useAdd";






function ProductCard({ product }) {

  const { addToCart, addedCartRed, addedCart } = useAdd();


  const [addedFav, setAddedFav] = useState(false); // add to Fav butonunun  click olduktan sonra veritabanına yazdmasını kontrol ediyor
  const [addedFavRed, setAddedFavRed] = useState(false); // add to Fav  butonunun  click olduktan sonra veritabanına yazamadığında kontrol ediyor

  const navigate = useNavigate(); // productDetail sayfasına giderken id kısmını da göndermek için

 


 


 const addToFavourites = async (product) => {
  try {
    const res = await fetch("http://localhost:3001/favourites");
    const data = await res.json();

    const exists = data.some( (fav) => Number(fav.productId) === Number(product.productId) // içerisinde varsa true döndürüyorlar unique olup olmama kontrol ediliyor
    );

    if (exists) {                                                // içerisinde varsa bu blok çalışıyor.
       setAddedFavRed(true);                                     // buton kırmızı oluyor.
       setTimeout(() => setAddedFavRed(false),1000);             // 1 saniye boyunca
       return(
        setTimeout(() => {navigate("/favourites");}, 1000)
       )
                                                        // return ediyor ve geri kalan kodu çalıştırmıyor.
    }


    await fetch("http://localhost:3001/favourites", {                  
      method: "POST",                               
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),                             // product card ın içerisinde aldığımız {product} parametresini burada servera yazdırıyoruz.
    });

    setAddedFav(true);                                             // buton yeşil oluyor.
    setTimeout(() => setAddedFav(false),1000);                     // 1 saniye boyunca

  } catch (error) {
    console.error("Add to favourites error:", error);
  }
};
  return (
    <div className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-[550px]">
      <div className="flex items-stretch">
        {/* IMAGE */}
        <div className="bg-neutral-100 flex items-center justify-center self-stretch">
          <div className="aspect-[9/16] w-[250px] h-full flex items-center">
            <img
             src={`${product.productImg}`}
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


         {/*  addedCart useState değişkenine göre iki tag den biri çalışıyor. */}
         {(!addedCart && !addedCartRed) && ( <button
            onClick={async () => await addToCart(product)} 
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50"
          >
            Add to Cart
          </button>)}

          {addedCart && (<div className="w-full mt-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold border border-green-200 text-center">
            ✓ Added successfully
          </div>)}
          {addedCartRed && (  <div className="w-full mt-4 py-3 rounded-xl bg-red-50 text-red-700 font-semibold border border-red-200 text-center">
              ✕ Already in cart
            </div>)}



         {/* ADD TO FAVOURITES BUTTON iki useState başlangıçta false olduğu için sadece o zaman bu button gösterilicek*/}
          
         {(!addedFav && !addedFavRed) && ( <button
              onClick={() => addToFavourites(product)}
              className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50">
              Add to Favourites
            </button>)}
          

          {/* SUCCESS MESSAGE */}
          
          {addedFav && ( <div className="w-full mt-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold border border-green-200 text-center">
              ✓ Added successfully
            </div>)}
          

          {/* ERROR MESSAGE */}
          
          {addedFavRed && (  <div className="w-full mt-4 py-3 rounded-xl bg-red-50 text-red-700 font-semibold border border-red-200 text-center">
              ✕ Already in favourites
            </div>)}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
