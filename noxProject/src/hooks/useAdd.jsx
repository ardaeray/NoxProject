import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export function useAdd() {

    const navigate = useNavigate();

    const [addedCart, setAddedCart] = useState(false);
    const [addedCartRed, setAddedCartRed] = useState(false);

    const addToCart = async (product) => { 
try {
    const res = await fetch("http://localhost:3001/cart");
    const data = await res.json();

    const exists = data.some( (fav) => Number(fav.productId) === Number(product.productId) // içerisinde varsa true döndürüyorlar unique olup olmama kontrol ediliyor
    );

    if (exists) {       
       setAddedCartRed(true);                                     // buton kırmızı oluyor.
       setTimeout(() => setAddedCartRed(false),1000);             // 1 saniye boyunca
       return(
        setTimeout(() => {navigate("/cart");}, 1000)
       )
      
                                                          // return ediyor ve geri kalan kodu çalıştırmıyor.
    }
  } catch (error) {
    console.error("Add to favourites error:", error);
  }




// buraya
    

    
    await fetch("http://localhost:3001/cart", { 
      method: "POST",                              // POST : eklemek  , DELETE : silmek, PATCH : güncellemek 
      headers: {                             
        "Content-Type": "application/json",       // server a yazacağım veri tipinin json olduğu anlamına geliyor.
      },
      body: JSON.stringify({                       // serverdan çektiğimiz verileri object haline getirip yazıyoruz.
        productId: product.productId, 
        productName: product.productName,
        productPrice: product.productPrice,
        productImg: product.productImg,
        quantity: 1,
      }),
    });
    
    setAddedCart(true);  // add to Cart  click olduğu için addedCart useState değişkenini True ya çekip Cart kısmına eklendiğini gösteriyor(yeşil şekilde).
    setTimeout(() => setAddedCart(false),1000);  // bir saniye sonra tekrar eski haline geliyor (add to cart yazısı)

    console.log("Çıktı Ah");
    
  };

    return {
        addToCart, addedCartRed, addedCart
    }

}

export default useAdd

