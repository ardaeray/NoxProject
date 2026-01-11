import React from "react";
import bannerImage from "../assets/HomePageBanner.png";
import aboutSmallImage from "../assets/AboutUsSmallImage.png";

function Home() {
  return (
    <main>
      {/* BANNER */}
      <section className="pt-12">
        <img src={bannerImage} alt="HomePageBanner" />
      </section>

      {/* ABOUT CONTENT */}
      <section>
        {/* Başlık */}
        <div className="flex items-center justify-center pt-8 pb-8">
          <h1 className="text-5xl font-bold">About Us</h1>
        </div>

        {/* Görsel + Metin */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <img
            src={aboutSmallImage}
            alt="AboutSmallImage"
            className="ml-5 mr-5 w-full md:w-1/5 max-w-md rounded-lg object-cover"
          />
          <p className="max-w-prose md:w-1/6 max-w-md px-1 py-2 leading-relaxed">
            Nox is a technology brand focused on clarity, performance, and
            intentional design. We create refined, minimalist products that feel
            natural to use while delivering powerful, reliable performance.
            Built as a connected ecosystem, Nox devices are designed for
            seamless interaction, long-term durability, and thoughtful
            engineering rather than short-lived trends. Every detail reflects
            our commitment to quality, simplicity, and quiet
            confidence—technology that integrates effortlessly into everyday
            life and stands the test of time.
            <br />
            <br />
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
