import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 px-3 mt-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <p className="text-xs text-gray-400 md:text-sm">
            Copyright 2026 © Nox Inc. All Rights Reserved
          </p>
        </div>

        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <p className="text-xs md:text-sm text-gray-400">Turkey, Istanbul</p>
        </div>
      </div>
    </footer>

    // <div>
    //   <footer>
    //     <p>&copy; 2026 MyWebsite. All rights reserved.</p>
    //   </footer>
    // </div>
  );
}

export default Footer;
