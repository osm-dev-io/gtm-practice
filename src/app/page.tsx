"use client";

import Link from "next/link";
import { pushToDataLayer } from "@/components/DataLayerPush";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="bg-blue-600 text-white rounded-xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to GTM Practice</h1>
        <p className="text-lg mb-6 text-blue-100">
          This site has multiple pages, buttons, forms, and events for you to practice Google Tag Manager.
        </p>
        <button
          id="hero-cta"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          onClick={() => pushToDataLayer("hero_cta_click")}
        >
          Get Started
        </button>
      </section>

      {/* Promotion Banner */}
      <section
        id="promo-banner"
        className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center cursor-pointer"
        onClick={() => pushToDataLayer("promo_banner_click", { promo_name: "spring_sale" })}
      >
        🔥 Spring Sale - 20% off all products! Click here to shop →
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "prod-1", name: "Starter Plan", price: "$9.99", category: "plans" },
            { id: "prod-2", name: "Pro Plan", price: "$29.99", category: "plans" },
            { id: "prod-3", name: "Enterprise Plan", price: "$99.99", category: "plans" },
          ].map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                pushToDataLayer("product_click", {
                  product_name: product.name,
                  product_price: product.price,
                  product_category: product.category,
                })
              }
            >
              <div className="h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                Image
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-1">{product.price}</p>
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  pushToDataLayer("add_to_cart", {
                    product_name: product.name,
                    product_price: product.price,
                  });
                  alert(`Added ${product.name} to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Newsletter</h2>
        <form
          id="newsletter-form"
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            pushToDataLayer("newsletter_signup", {
              email_domain: (formData.get("email") as string).split("@")[1] || "unknown",
            });
            alert("Subscribed! (Check dataLayer)");
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "View Products", href: "/products" },
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Download PDF", href: "#" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition font-medium text-sm"
            onClick={() => pushToDataLayer("quick_link_click", { link_text: link.label })}
          >
            {link.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
