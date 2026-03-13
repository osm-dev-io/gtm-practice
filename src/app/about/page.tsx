"use client";

import { useEffect, useRef } from "react";
import { pushToDataLayer } from "@/components/DataLayerPush";

export default function About() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pushToDataLayer("section_view", {
              section_name: entry.target.getAttribute("data-section"),
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      content:
        "We help marketers and developers learn Google Tag Manager through hands-on practice. This site was built specifically for GTM experimentation.",
    },
    {
      id: "team",
      title: "Our Team",
      content:
        "A group of analytics enthusiasts who believe the best way to learn is by doing. We've built this sandbox so you can safely test triggers, tags, and variables.",
    },
    {
      id: "approach",
      title: "Our Approach",
      content:
        "Each page on this site contains different interactive elements — buttons, forms, scroll events, video embeds — designed to give you a wide variety of GTM scenarios to practice with.",
    },
  ];

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">About Us</h1>

      {sections.map((section, i) => (
        <section
          key={section.id}
          ref={(el) => { sectionsRef.current[i] = el; }}
          data-section={section.id}
          className="bg-white rounded-lg shadow p-8"
        >
          <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
          <p className="text-gray-600 leading-relaxed">{section.content}</p>
        </section>
      ))}

      {/* Accordion FAQ */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        {[
          { q: "What is GTM?", a: "Google Tag Manager is a tag management system that allows you to manage and deploy marketing tags on your website without modifying code." },
          { q: "Is this site free?", a: "Yes! This is a practice sandbox. Use it to experiment with GTM triggers, tags, and variables." },
          { q: "Can I break anything?", a: "Nope! This is a safe environment. Experiment freely with dataLayer events and GTM configurations." },
        ].map((faq) => (
          <details
            key={faq.q}
            className="border-b py-3 group"
            onClick={() => pushToDataLayer("faq_toggle", { faq_question: faq.q })}
          >
            <summary className="cursor-pointer font-medium hover:text-blue-600 transition">
              {faq.q}
            </summary>
            <p className="mt-2 text-gray-600 text-sm">{faq.a}</p>
          </details>
        ))}
      </section>

      {/* Video Section (for element visibility triggers) */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Watch Our Intro</h2>
        <div
          id="video-placeholder"
          className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center cursor-pointer"
          onClick={() => pushToDataLayer("video_play", { video_title: "GTM Intro" })}
        >
          <span className="text-white text-6xl">▶</span>
        </div>
      </section>
    </div>
  );
}
