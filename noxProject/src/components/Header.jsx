import React from "react";
import { Link } from "react-router-dom";
import noxLogo from "../../public/assets/noxLogoTransparent.png";
import { useState } from "react";

function Header() {
  const menuItems = [
    { label: "📱 NoxPhone", to: "/noxPhone" },
    { label: "💻 NoxBook", to: "/noxBook" },
    { label: "⌚️ NoxWatch", to: "/noxWatch" },
    { label: "🎧 NoxBuds", to: "/noxBuds" },
    { label: "🖥️ NoxView", to: "/noxView" },
    { label: "About Us", to: "/about" },
    { label: "👜 Cart", to: "/cart" },
    { label: "❤️ Favourites", to: "/favourites" },
    { label: "Log In", to: "/login" },
    { label: "Sign Up", to: "/signup" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black">
      <nav className="mx-auto max-w-7xl px-6">
        <ul className="relative flex h-12 items-center text-sm">
          {/* Top Left Logo */}
          <li className="flex items-center">
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
            hidden md:flex 
            gap-6 
            absolute left-1/2 -translate-x-1/2
            whitespace-nowrap
          "
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
            className="ml-auto md:hidden text-white text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </ul>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-white hover:text-gray-400 transition-colors"
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
