import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Stars,
  Environment,
  Float,
  ContactShadows,
} from "@react-three/drei";

// "Honda Prelude 1997 Free" by Black Snow, CC BY 4.0 (credited in the footer)
const MODEL_PATH = "/prelude.glb";

function PreludeModel({ still }) {
  const { scene } = useGLTF(MODEL_PATH);

  return (
    <Float
      speed={still ? 0 : 1.5}
      rotationIntensity={0.4}
      floatIntensity={0.6}
    >
      <primitive
        object={scene}
        scale={0.7}
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI / 5, 0]}
      />
    </Float>
  );
}

// Loaded lazily from Hero so three.js doesn't block the rest of the page.
// `active` pauses rendering while the hero is scrolled out of view, `lite`
// lowers the cost on small screens, and `still` honors reduced motion.
export default function HeroScene({ active, lite, still }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 50 }}
      dpr={[1, lite ? 1.5 : 2]}
      frameloop={active ? "always" : "never"}
    >
      <ambientLight intensity={0.3} color="#0a1533" />
      <pointLight position={[3, 2, 3]} intensity={4} color="#2563EB" />
      <pointLight position={[-3, -1, 2]} intensity={3} color="#1D4ED8" />
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        intensity={2}
        color="#0EA5E9"
        angle={0.3}
        penumbra={1}
      />
      <Stars
        radius={80}
        depth={50}
        count={lite ? 1000 : 3000}
        factor={3}
        fade
        speed={still ? 0 : 0.5}
      />
      {/* Keeps model/environment loading inside the canvas. Without this the
          suspend reaches Hero's Suspense, which hides the canvas and loses
          the WebGL context. */}
      <Suspense fallback={null}>
        <Environment preset="night" />
        <PreludeModel still={still} />
      </Suspense>
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        color="#3B82F6"
      />
    </Canvas>
  );
}
