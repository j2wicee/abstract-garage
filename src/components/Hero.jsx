import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Stars,
  Environment,
  Float,
  ContactShadows,
} from "@react-three/drei";

function PrelueModel() {
  const { scene } = useGLTF("/honda_prelude_1997_free.glb");

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <primitive
        object={scene}
        scale={0.7}
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI / 5, 0]}
      />
    </Float>
  );
}

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
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
            count={3000}
            factor={3}
            fade
            speed={0.5}
          />
          <Environment preset="night" />
          <PrelueModel />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            color="#3B82F6"
          />
        </Canvas>
      </div>

      {/* Hero Text */}
      <div className="relative z-10 text-center px-6 pointer-events-none">
        <p className="text-blue-500 text-xs tracking-[0.4em] uppercase font-mono mb-6">
          Abstract Garage & Customs
        </p>
        <h1
          className="text-white font-black uppercase leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Mechanics On A<br />
          <span className="text-blue-500">Different Level.</span>
        </h1>
        <p className="text-zinc-400 text-sm tracking-widest uppercase font-mono mb-10">
          Aberdeen, NC · By Appointment
        </p>

        <a
          href="#contact"
          className="pointer-events-auto inline-block border border-blue-500 text-blue-500
          font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-blue-500
          hover:text-white transition-all duration-300"
        >
          Book a Service →
        </a>
      </div>
    </div>
  );
}
