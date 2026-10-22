import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import logo from "../data/logo-shapes.json";

const DEPTH = 0.24;

function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(37, 99, 235, 0.55)");
  gradient.addColorStop(0.45, "rgba(29, 78, 216, 0.18)");
  gradient.addColorStop(1, "rgba(29, 78, 216, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Assembled pose: turned so the blue sides show down and to the left, like
// the extruded look of the original artwork.
const POSE = { x: -0.32, y: 0.38 };

// Where each piece sits when the logo is "exploded" across levels.
// Piece order comes from scripts/trace-logo.py (largest first):
// 0 gear, 1 A body, 2 G lower bowl, 3 left arc, 4 A left foot,
// 5 G top, 6 G right arc, 7 G foot, 8 G crossbar.
const LEVELS = [
  { z: -2.4, drift: [0.5, 0.2], spin: 0.12 },
  { z: 1.4, drift: [0, 0], spin: -0.06 },
  { z: 0.4, drift: [-0.2, -0.5], spin: 0.1 },
  { z: -1.0, drift: [-0.6, 0.1], spin: -0.14 },
  { z: 2.4, drift: [-0.5, -0.4], spin: 0.08 },
  { z: -1.7, drift: [0.1, 0.6], spin: -0.1 },
  { z: 0.9, drift: [0.5, -0.1], spin: 0.12 },
  { z: 3.0, drift: [0.3, -0.6], spin: -0.16 },
  { z: 2.0, drift: [0.4, 0.2], spin: 0.18 },
];

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function toShape(piece) {
  const shape = new THREE.Shape(piece.outline.map(([x, y]) => new THREE.Vector2(x, y)));
  shape.holes = piece.holes.map(
    (hole) => new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y)))
  );
  return shape;
}

function Logo({ progress, still }) {
  const group = useRef(null);
  const meshes = useRef([]);
  const glow = useRef(null);
  const current = useRef(0);
  const { viewport } = useThree();

  // One extruded geometry per piece, centered on its own middle so each
  // piece can move and spin independently.
  const pieces = useMemo(
    () =>
      logo.pieces.map((piece) => {
        const geometry = new THREE.ExtrudeGeometry(toShape(piece), {
          depth: DEPTH,
          bevelEnabled: false,
        });
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        return { geometry, center };
      }),
    []
  );

  // Black glossy faces with glowing blue sides, like the original artwork.
  // ExtrudeGeometry puts the caps in group 0 and the sides in group 1.
  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: "#24242e", metalness: 0.5, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({
        color: "#1d4ed8",
        emissive: "#1e3fd8",
        emissiveIntensity: 0.9,
        metalness: 0.3,
        roughness: 0.4,
      }),
    ],
    []
  );

  const glowTexture = useMemo(() => makeGlowTexture(), []);

  // Fit the assembled logo to the screen, leaving room for the caption
  const fit = Math.min(
    (viewport.height * 0.58) / logo.height,
    (viewport.width * 0.82) / logo.width
  );

  useFrame((state, delta) => {
    const target = still ? 0 : progress.get();
    current.current = THREE.MathUtils.damp(current.current, target, 5, delta);
    const assembled = easeInOut(current.current);
    const apart = 1 - assembled;
    const t = still ? 0 : state.clock.elapsedTime;

    pieces.forEach(({ center }, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const level = LEVELS[i] ?? LEVELS[0];
      const bob = Math.sin(t * 0.8 + i * 1.3) * 0.06 * apart;
      mesh.position.set(
        center.x + level.drift[0] * apart,
        center.y + level.drift[1] * apart + bob,
        level.z * apart
      );
      mesh.rotation.z = level.spin * apart;
    });

    const g = group.current;
    g.rotation.y = -0.7 * apart + (POSE.y + Math.sin(t * 0.35) * 0.1) * assembled;
    g.rotation.x = 0.28 * apart + (POSE.x + Math.sin(t * 0.25) * 0.04) * assembled;
    glow.current.material.opacity = 0.35 + 0.45 * assembled;
    // The turned pose shifts the logo left visually; nudge it back to center
    g.position.x = 0.18 * fit * assembled;
    g.position.y = 0.35 * assembled * (viewport.height / 5.6);
    g.scale.setScalar(fit * (0.9 + 0.1 * assembled));
  });

  return (
    <group ref={group}>
      {/* Soft blue glow behind the logo so the black faces stand out */}
      <mesh ref={glow} position={[0, 0, -1.2]} scale={logo.width * 1.9}>
        <planeGeometry />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {pieces.map(({ geometry }, i) => (
        <mesh
          key={i}
          ref={(el) => (meshes.current[i] = el)}
          geometry={geometry}
          material={materials}
        />
      ))}
    </group>
  );
}

// Loaded lazily from Hero so three.js doesn't block the rest of the page.
// `progress` is a framer-motion value from 0 (logo apart) to 1 (assembled),
// `active` pauses rendering while the hero is scrolled out of view, `lite`
// lowers the cost on small screens, and `still` honors reduced motion.
export default function HeroScene({ progress, active, lite, still }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, lite ? 1.5 : 2]}
      frameloop={active ? "always" : "never"}
    >
      <ambientLight intensity={0.25} color="#0a1533" />
      <pointLight position={[3, 2, 4]} intensity={30} color="#2563EB" />
      <pointLight position={[-3, -1, 3]} intensity={20} color="#1D4ED8" />
      <directionalLight position={[2, 4, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-3, 1, 4]} intensity={0.8} color="#93c5fd" />
      <Stars
        radius={80}
        depth={50}
        count={lite ? 1000 : 3000}
        factor={3}
        fade
        speed={still ? 0 : 0.5}
      />
      <Logo progress={progress} still={still} />
      {/* Keeps environment loading inside the canvas. Without this the
          suspend reaches Hero's Suspense, which hides the canvas and loses
          the WebGL context. */}
      <Suspense fallback={null}>
        <Environment preset="night" environmentIntensity={2.5} />
      </Suspense>
    </Canvas>
  );
}
