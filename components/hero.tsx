"use client";

import Particle from "@/components/ui/particles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero(props: {
  title2: string;
  subtitle: string;
  credits?: React.ReactNode;
  primaryCtaText: string;
  primaryCtaLink: string;
}) {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderVisible(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log("headerVisible", headerVisible);

  return (
    <section
      id="inicio"
      className={`relative flex items-center justify-center min-h-screen py-16 md:py-24 lg:py-32 transition-all duration-500 ${
    headerVisible ? "mt-18" : "pt-18"
  }`}
    >
      <Particle />

      <div className="container relative z-10 flex max-w-[64rem] flex-col items-center gap-8 text-center">
        <h1 className="font-heading font-medium text-5xl sm:text-5xl lg:text-7xl">
          Conect<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff8c45] to-[#ff0000]">.</span>AI
        </h1>
        <span className="font-heading font-semibold text-4xl sm:text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#ff8c45] to-[#ff0000]">
          {props.title2}
        </span>
        <p className="max-w-[42rem] leading-normal text-muted-foreground text-2xl sm:text-3xl sm:leading-8">
          {props.subtitle}
        </p>

        <div className="flex flex-wrap justify-center">
          <Link
            href={props.primaryCtaLink}
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
          >
            {props.primaryCtaText}
          </Link>
        </div>

        {props.credits && (
          <p className="text-sm text-muted-foreground mt-4">{props.credits}</p>
        )}
      </div>
    </section>
  );
}
