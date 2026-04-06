"use client";

import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./HeroBanner"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

export default function HeroBannerClient() {
  return <HeroBanner />;
}
