"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Palette (normalized for GLSL):
// #131314  → bg          vec3(0.075, 0.075, 0.078)
// #0B1D45  → royal blue  vec3(0.043, 0.114, 0.271)
// #1A3A6B  → mid blue    vec3(0.102, 0.227, 0.420)
// #C9A84C  → gold        vec3(0.788, 0.659, 0.298)
// #E8C96A  → bright gold vec3(0.910, 0.788, 0.416)

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

    float centerFade = 1.0 - smoothstep(0.0, 0.82, length(p * vec2(0.52, 1.05)));
    smoke *= centerFade;
    smoke  = smoothstep(0.04, 0.60, smoke);

    vec3 bgColor    = vec3(0.075, 0.075, 0.078);
    vec3 blueDeep   = vec3(0.043, 0.114, 0.271);
    vec3 blueMid    = vec3(0.102, 0.227, 0.420);
    vec3 gold       = vec3(0.788, 0.659, 0.298);
    vec3 goldBright = vec3(0.910, 0.788, 0.416);

    vec3 color = mix(bgColor,  blueDeep,    pow(smoke, 0.7) * 0.9);
    color      = mix(color,    blueMid,     pow(smoke, 1.4) * 0.7);
    color      = mix(color,    gold,        pow(smoke, 2.2) * 0.75);
    color      = mix(color,    goldBright,  pow(smoke, 3.5) * 0.55);

    float vignette = smoothstep(1.05, 0.2, length(vUv - 0.5) * 1.85);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

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
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    if (!isWebGLSupported()) {
      setWebGLFailed(true);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false });
    } catch {
      setWebGLFailed(true);
      return;
    }

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

    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();
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
      renderer.forceContextLoss();
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
      flexShrink: 0,
      overflow: "hidden",
      background: G.bg,
    }}>
      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translate(0,    0)    scale(1);    }
          30%     { transform: translate(-4%,  6%)   scale(1.08); }
          60%     { transform: translate( 5%, -4%)   scale(0.94); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,    0)    scale(1);    }
          25%     { transform: translate(-7%,  5%)   scale(1.12); }
          70%     { transform: translate( 4%, -6%)   scale(0.92); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,    0)    scale(1);    }
          40%     { transform: translate( 6%, -8%)   scale(1.10); }
          80%     { transform: translate(-4%,  5%)   scale(0.95); }
        }
        @keyframes blob4 {
          0%,100% { transform: translate(0,    0)    scale(1)    rotate(  0deg); }
          33%     { transform: translate(-8%, -5%)   scale(1.15) rotate( 12deg); }
          66%     { transform: translate( 6%,  7%)   scale(0.88) rotate( -8deg); }
        }
      `}</style>

      {/* ── Animated blob background — always visible ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#131314" }}>
        {/* large blue centre mass */}
        <div style={{
          position: "absolute", width: "90%", height: "80%",
          top: "10%", left: "5%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,58,107,0.60) 0%, rgba(11,29,69,0.35) 50%, transparent 75%)",
          filter: "blur(80px)",
          animation: "blob1 16s ease-in-out infinite",
        }} />
        {/* gold highlight — top-right */}
        <div style={{
          position: "absolute", width: "55%", height: "65%",
          top: "-5%", right: "5%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.24) 0%, rgba(26,58,107,0.28) 55%, transparent 80%)",
          filter: "blur(90px)",
          animation: "blob2 20s ease-in-out infinite",
        }} />
        {/* deep navy — bottom-left */}
        <div style={{
          position: "absolute", width: "60%", height: "70%",
          bottom: "-10%", left: "-5%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,29,69,0.55) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "blob3 22s ease-in-out infinite",
        }} />
        {/* soft gold core */}
        <div style={{
          position: "absolute", width: "40%", height: "50%",
          top: "25%", left: "30%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(232,201,106,0.06) 50%, transparent 75%)",
          filter: "blur(60px)",
          animation: "blob4 18s ease-in-out infinite",
        }} />
        {/* vignette — darkens edges like the shader's smoothstep */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, rgba(19,19,20,0.55) 65%, #131314 100%)",
        }} />
      </div>

      {/* ── Three.js canvas — overlays blobs when WebGL works ── */}
      {!webGLFailed && (
        <div ref={mountRef} style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }} />
      )}

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
        padding: "0 24px",
        zIndex: 10,
        width: "100%",
        maxWidth: "980px",
      }}>

        {/* Brand wordmark */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "44px",
          animation: "heroFadeUp 1s ease 0.2s both",
        }}>
          <div style={{
            width: "36px",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${G.gold})`,
            opacity: 0.55,
          }} />
          <span style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: G.goldDim,
          }}>
            Evrlink
          </span>
          <div style={{
            width: "36px",
            height: "1px",
            background: `linear-gradient(to left, transparent, ${G.gold})`,
            opacity: 0.55,
          }} />
        </div>

        {/* H1 — cream serif */}
        <h1 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          fontWeight: 300,
          lineHeight: 1.06,
          letterSpacing: "-0.025em",
          color: G.cream,
          margin: "0 0 10px",
          animation: "heroFadeUp 1.1s ease 0.4s both",
        }}>
          Every luxury item<br />generates lifetime value.
        </h1>

        {/* H2 — gold italic */}
        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 4.6rem)",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          color: G.gold,
          margin: "0 0 48px",
          animation: "heroFadeUp 1.1s ease 0.58s both",
        }}>
          Luxury brands don&apos;t see any of it.
        </h2>

        {/* Vertical thread */}
        <div style={{
          width: "1px",
          height: "28px",
          background: `linear-gradient(to bottom, ${G.gold}, transparent)`,
          marginBottom: "22px",
          opacity: 0.4,
          animation: "heroFadeUp 0.8s ease 0.72s both",
        }} />

        {/* Subtitle */}
        <p style={{
          fontSize: "13.5px",
          fontWeight: 300,
          color: G.creamDim,
          maxWidth: "360px",
          lineHeight: 1.85,
          margin: "0 0 44px",
          animation: "heroFadeUp 1s ease 0.85s both",
        }}>
          Evrlink is the infrastructure that connects luxury brands
          to the lifetime value of their products.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "heroFadeUp 1s ease 1s both",
        }}>
          {/* Primary — filled gold */}
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 38px",
              borderRadius: "999px",
              border: `1px solid ${G.gold}`,
              background: G.gold,
              fontSize: "11.5px",
              fontWeight: 500,
              color: G.bg,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = G.goldBright;
              el.style.borderColor = G.goldBright;
              el.style.boxShadow = "0 0 36px rgba(201,168,76,0.45)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = G.gold;
              el.style.borderColor = G.gold;
              el.style.boxShadow = "none";
            }}
          >
            Get Early Access
          </a>

          {/* Secondary — outline */}
          <a
            href="#problem"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "14px 32px",
              borderRadius: "999px",
              border: `1px solid ${G.goldBorder}`,
              background: "transparent",
              fontSize: "11.5px",
              fontWeight: 500,
              color: G.gold,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = G.goldBg;
              el.style.borderColor = G.gold;
              el.style.boxShadow = "0 0 22px rgba(201,168,76,0.2)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.borderColor = G.goldBorder;
              el.style.boxShadow = "none";
            }}
          >
            Learn More
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "heroFadeUp 1s ease 1.3s both",
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
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0;   }
          40%  { transform: scaleY(1); transform-origin: top;    opacity: 0.6; }
          60%  { transform: scaleY(1); transform-origin: bottom; opacity: 0.6; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0;   }
        }
      `}</style>
    </section>
  );
}
