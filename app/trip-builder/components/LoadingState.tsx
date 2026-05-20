"use client";

import { useEffect, useState } from "react";

const COPY_ROTATION = [
  "Mapping your route…",
  "Checking seasonal trade-offs…",
  "Selecting region pairings…",
  "Reading the logistics…",
  "Considering the timing…",
  "Crafting your skeleton…",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % COPY_ROTATION.length);
        setVisible(true);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-stone-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-stone-600 text-lg font-light tracking-wide transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        {COPY_ROTATION[index]}
      </p>
      <p className="text-stone-400 text-sm">
        This takes 10–20 seconds — we&apos;re doing real work.
      </p>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
