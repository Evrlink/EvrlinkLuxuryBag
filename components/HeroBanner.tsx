"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Colors (normalized):
// #131314  → bg       vec3(0.075, 0.075, 0.078)
// #0B1D45  → royal blue      vec3(0.043, 0.114, 0.271)
// #1A3A6B  → mid blue       vec3(0.102, 0.227, 0.420)
// #C9A84C  → gold    vec3(0.788, 0.659, 0.298)
// #E8C96A  → bright gold    vec3(0.910, 0.788, 0.416)

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2  vUv;

  vec3 hash3(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(dot(hash3(i+vec3(0,0,0)), f-vec3(0,0,0)),
            dot(hash3(i+vec3(1,0,0)), f-vec3(1,0,0)), u.x),
        mix(dot(hash3(i+vec3(0,1,0)), f-vec3(0,1,0)),
            dot(hash3(i+vec3(1,1,0)), f-vec3(1,1,0)), u.x), u.y),
      mix(
        mix(dot(hash3(i+vec3(0,0,1)), f-vec3(0,0,1)),
            dot(hash3(i+vec3(1,0,1)), f-vec3(1,0,1)), u.x),
        mix(dot(hash3(i+vec3(0,1,1)), f-vec3(0,1,1)),
            dot(hash3(i+vec3(1,1,1)), f-vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  float smokeFbm(vec3 p) {
    vec3 q = vec3(fbm(p), fbm(p + vec3(5.2, 1.3, 0.0)), fbm(p + vec3(1.7, 9.2, 0.0)));
    vec3 r = vec3(
      fbm(p + 3.5*q + vec3(1.7, 9.2, 0.0)),
      fbm(p + 3.5*q + vec3(8.3, 2.8, 0.0)),
      fbm(p + 3.5*q + vec3(4.1, 6.6, 0.0))
    );
    return fbm(p + 3.0 * r);
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2  p = (vUv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.065;

    vec3 pos = vec3(p * 1.55, t);
    float smoke = smokeFbm(pos + vec3(0.0, t * 0.22, 0.0));

    // Fade smoke toward edges, concentrate in center
    float centerFade = 1.0 - smoothstep(0.0, 0.82, length(p * vec2(0.52, 1.05)));
    smoke *= centerFade;
    smoke  = smoothstep(0.04, 0.60, smoke);

    // --- Luxury color palette ---
    vec3 bgColor   = vec3(0.075, 0.075, 0.078);  // #131314
    vec3 blueDeep  = vec3(0.043, 0.114, 0.271);  // #0B1D45 royal blue
    vec3 blueMid   = vec3(0.102, 0.227, 0.420);  // #1A3A6B lighter royal blue
    vec3 gold      = vec3(0.788, 0.659, 0.298);  // #C9A84C gold
    vec3 goldBright= vec3(0.910, 0.788, 0.416);  // #E8C96A bright gold

    // Layer 1: bg → deep royal blue
    vec3 color = mix(bgColor, blueDeep, pow(smoke, 0.7) * 0.9);
    // Layer 2: add mid-blue as smoke thickens
    color = mix(color, blueMid, pow(smoke, 1.4) * 0.7);
    // Layer 3: gold highlights at the brightest peaks
    color = mix(color, gold,       pow(smoke, 2.2) * 0.75);
    color = mix(color, goldBright, pow(smoke, 3.5) * 0.55);

    // Vignette — darker edges
    float vignette = smoothstep(1.05, 0.2, length(vUv - 0.5) * 1.85);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Token palette for UI
const G = {
  gold: "#C9A84C",
  goldBright: "#E8C96A",
  goldDim: "rgba(201,168,76,0.55)",
  goldBorder: "rgba(201,168,76,0.28)",
  goldBg: "rgba(201,168,76,0.08)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  bg: "#131314",
};

export default function HeroBanner() {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(w, h) },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    scene.add(new THREE.Mesh(geometry, material));

    const timer = new THREE.Timer();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timer.update();
      uniforms.uTime.value = timer.getElapsed();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      renderer.setSize(nw, nh);
      uniforms.uResolution.value.set(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: G.bg,
    }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }} />

      {/* Center content */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "28px",
        padding: "0 24px",
        zIndex: 10,
        width: "100%",
        maxWidth: "920px",
      }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 18px",
          borderRadius: "999px",
          border: `1px solid ${G.goldBorder}`,
          background: G.goldBg,
          backdropFilter: "blur(10px)",
        }}>
          <span style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: G.gold,
            display: "inline-block",
            boxShadow: `0 0 6px ${G.gold}`,
          }} />
          <span style={{
            fontSize: "10.5px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: G.goldDim,
          }}>
            Invisible Microchips
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(3rem, 8.5vw, 7.5rem)",
          fontWeight: 300,
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: G.cream,
          margin: 0,
        }}>
          Luxury goods.<br />Verified.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "14px",
          fontWeight: 300,
          color: G.creamDim,
          maxWidth: "340px",
          lineHeight: 1.75,
          margin: 0,
        }}>
          Luxury protected by custom-built microchips and linked to digital certificates.
        </p>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "13px 36px",
            borderRadius: "999px",
            border: `1px solid ${G.goldBorder}`,
            background: "transparent",
            fontSize: "12.5px",
            fontWeight: 500,
            color: G.gold,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            marginTop: "4px",
            transition: "background 0.35s, color 0.35s, border-color 0.35s, box-shadow 0.35s",
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = G.gold;
            el.style.color = G.bg;
            el.style.borderColor = G.gold;
            el.style.boxShadow = `0 0 28px rgba(201,168,76,0.35)`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = G.gold;
            el.style.borderColor = G.goldBorder;
            el.style.boxShadow = "none";
          }}
        >
          Get a Demo
        </a>
      </div>

      {/* Scroll line */}
      <div style={{
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}>
        <div style={{
          width: "1px",
          height: "44px",
          background: `linear-gradient(to bottom, ${G.gold}, transparent)`,
          animation: "scrollLine 2.2s ease-in-out infinite",
          opacity: 0.6,
        }} />
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40%  { transform: scaleY(1); transform-origin: top; opacity: 0.6; }
          60%  { transform: scaleY(1); transform-origin: bottom; opacity: 0.6; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
