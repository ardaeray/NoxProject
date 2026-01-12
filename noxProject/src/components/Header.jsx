import React, { useContext } from "react";
import { Link } from "react-router-dom";
import noxLogo from "../../public/assets/noxLogoTransparent.png";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

function Header() {
  const { state,dispatch } = useContext(AppContext);
  

  const[logOut,setLogOut] = useState(false);

 let checkLogOut  = () => {
        dispatch({
        type: "LOGIN",
        payload: {
             user: null,
             cart: [],
             favourites: [],
             isAuth: false,
        },
    });
  }

  const menuItems = [

    { label: "📱 NoxPhone", to: "/noxPhone" },
    { label: "💻 NoxBook", to: "/noxBook" },
    { label: "⌚️ NoxWatch", to: "/noxWatch" },
    { label: "🎧 NoxBuds", to: "/noxBuds" },
    { label: "🖥️ NoxView", to: "/noxView" },
    { label: "About Us", to: "/about" },
   state.isAuth && { label: "👜 Cart", to: "/cart" },
   state.isAuth && { label: "❤️ Favourites", to: "/favourites" },
   !state.isAuth && { label: "Log In", to: "/login" },
   state.isAuth && { label: "Log Out", to: "#" },
  !state.isAuth && { label: "Sign Up", to: "/signup" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black">
      <nav className="mx-auto max-w-7xl px-6">
        <ul className="grid grid-cols-[auto_1fr_auto] h-12 items-center text-sm">
          {/* Top Left Logo */}
          <li className="flex items-center shrink-0">
            <Link to="/">
              <img
                src={noxLogo}
                alt="Nox Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </li>

          {/* Middle Navbar Links */}
          <li
            className="
              hidden lg:flex justify-center gap-3 lg:gap-6 whitespace-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-white hover:text-gray-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </li>

          {/* Hamburger Button For Mobile */}
          <button
            className="lg:hidden col-start-3 justify-self-end text-white text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </ul>
      </nav>
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-white hover:text-gray-400 transition-colors"
                onDoubleClick = {() => checkLogOut}
              >
                {item.label}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;