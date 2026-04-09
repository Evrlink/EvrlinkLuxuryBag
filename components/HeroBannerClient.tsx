"use client";

import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./HeroBanner"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100vh", background: "#131314" }} />
  ),
});

export default function HeroBannerClient() {
  return <HeroBanner />;
}
