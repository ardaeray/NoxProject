// import { createContext, useReducer  } from "react";

// export const AppContext = createContext(); 

// const initialState = {  
//   user: null,
//   cart: [],
//   favourites: [],
//   isAuth: false,
// };

// function reducer(state, action) { 
//   switch (action.type) {
//     default:
//       return state;
//   }
// }


// export function AppProvider({ children }) {



// // PEKİ BU NASIL ÇALIŞIR : örneğin buton onClick oldu dispatch çağırılır örnek dispatch({ type: "INCREMENT" }) sonra bunu reducer a verir sonra reducer da  "INCREMENT" kısmı çalışır ve geri state döner sonra da bu state state eşitlenir ve sayfanın güncel durumu olur.


//   return (
//     <AppContext.Provider value={{}}>    
                                                                                                    
//       {children} {/* AppProvider ile sardığım herşey */}
//     </AppContext.Provider>
//   );
// }




import { createContext, useReducer, useEffect } from "react";

export const AppContext = createContext();                                  // uygulama içinde paylaşılacak bir kanal oluşturmak için.

const savedState = JSON.parse(localStorage.getItem("appState"));               // başlangıç state i her şey boş oluyor. eğer bir user ile eşleşirse o zaman state i değiştir diyip bunların içini dolduracaz.

const initialState = savedState || {
  user: null,
  cart: [],
  favourites: [],
  isAuth: false,
};

// function reducer(state, action) {     // reducer dispatch in getirdiği action ı alır ve mevcut state i alıp action ile o state üzerinde yeni değişikliği yapıp geri state i döndürür.
//   switch (action.type) {

//     case "LOGIN":
//       return {
//         user: action.payload,
//         cart: action.payload.cart || [],
//         favourites: action.payload.favourites || [],
//         isAuth: true,
//       };

//     case "LOGOUT":
//       return {
//         user: null,
//         cart: [],
//         favourites: [],
//         isAuth: false,
//       };

//     case "ADD_CART":
//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//       };

//     case "REMOVE_CART":
//       return {
//         ...state,
//         cart: state.cart.filter(i => i.id !== action.payload),
//       };

//     case "ADD_FAV":
//       return {
//         ...state,
//         favourites: [...state.favourites, action.payload],
//       };

//     case "REMOVE_FAV":
//       return {
//         ...state,
//         favourites: state.favourites.filter(i => i.id !== action.payload),
//       };

//     default:
//       return state;
//   }
// }

    // dispatch({
    //     type: "ADD_CART",
    //     payload: product,
    //   });

function reducer(state, action){
    switch (action.type) {
        case "LOGIN":
            return {
               userId:action.payload.id,
                user: action.payload,
                cart: action.payload.cart || [],
                favourites: action.payload.favourites || [],
                isAuth: true
            };
    }

}


export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);     // const [state, dispatch] = useReducer(reducer, initialState); 

  // state : mevcut durum yani objenin içi (mesela cart içindeki ürünleri tutan, veya userı tutan veya favouritesleri mevcut tutan object ) dipatch: hangi action yapılacağını belirtir kendisi yapmaz sadece reducer a bunu yapıcaksın der, reducer ise o actionı yapar, initialState se state in ilk hali. bunun sonucunda reducer yeni state döner.yukarıda da reducer fonksiyonu var onun içinde gerçekleşir ve return state eder. 


useEffect(() => {
  if (state.user) {
    fetch(`http://localhost:3001/users/${state.user.id}`, { //http://localhost:3001/users/users/5 örnek görünüm bu url den takip eder. ve bir değişiklik yapılınca tetiklenecek ya hemen Patch ile günceller onu.
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: state.cart,
        favourites: state.favourites,
      }),
    });
  }
}, [state.cart, state.favourites]); // state.cart veya state.favourites değişirse tetiklenecek çalışıcak ve güncel veriyi alıcak bu şekilde her zaman güncel kalıcak.Tabiki de başta ne olur ne olmaaz diye user var mı diye de kontrol ediyoruz.(hata almamak için)

  return (
    <AppContext.Provider value={{ state, dispatch }}>  {/*“Rr” */}
      {children}
    </AppContext.Provider>
  );
}
