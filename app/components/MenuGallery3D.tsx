'use client'

import { useRef, useState, useMemo, Suspense, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  Html,
} from '@react-three/drei'
import { motion, PanInfo } from 'framer-motion'
import * as THREE from 'three'

// ─── Constants ──────────────────────────────────────────────────────────────
const GOLD = '#C9A96E'
const CREAM = '#F5EDD8'
const SPACING = 2.55

// ─── Card Data ───────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 0,
    label: 'Cocktails',
    subtitle: 'Crafted Perfection',
    price: 'From R89',
    items: [
      'Marbellicious · R195',
      'Strawberry Bubbly · R225',
      'El Patron Margarita · R175',
      'Classic Martini · R89',
    ],
  },
  {
    id: 1,
    label: 'Steaks & Grills',
    subtitle: 'Premium Cuts',
    price: 'From R195',
    items: [
      'Wagyu Beef Burger · R195',
      'Beef Rump 300g',
      'BBQ Ribs · 350g',
      'Dry Rubbed Lamb Chops',
    ],
  },
  {
    id: 2,
    label: 'Seafood',
    subtitle: 'Ocean Fresh Daily',
    price: 'From R265',
    items: [
      'King Prawns',
      'Lobster Burger · R195',
      'Spaghetti Ai Ghamberi · R265',
      'Seafood Platter',
    ],
  },
]

// ─── Gold Material shared props ──────────────────────────────────────────────
const goldProps = {
  color: GOLD,
  metalness: 1 as number,
  roughness: 0.05 as number,
  envMapIntensity: 3 as number,
}

// ─── Rotating Torus (Cocktails) ──────────────────────────────────────────────
function TorusIcon({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.x += dt * (active ? 1.4 : 0.45)
    ref.current.rotation.y += dt * (active ? 0.9 : 0.3)
  })
  return (
    <mesh ref={ref} castShadow={false} receiveShadow={false}>
      <torusGeometry args={[0.26, 0.07, 12, 28]} />
      <meshPhysicalMaterial {...goldProps} />
    </mesh>
  )
}

// ─── Spinning Octahedron (Steaks) ─────────────────────────────────────────────
function DiamondIcon({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * (active ? 1.1 : 0.38)
    ref.current.rotation.z += dt * (active ? 0.4 : 0.14)
  })
  return (
    <mesh ref={ref} castShadow={false} receiveShadow={false}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshPhysicalMaterial {...goldProps} roughness={0.04} />
    </mesh>
  )
}

// ─── Wave BufferGeometry (Seafood) ────────────────────────────────────────────
function WaveIcon({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const rows = 6
    const cols = 14
    const verts: number[] = []
    const idxs: number[] = []

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        verts.push(
          (c / cols - 0.5) * 0.72,
          Math.sin((c / cols) * Math.PI * 2.5) * 0.13 +
            Math.sin((r / rows) * Math.PI) * 0.08,
          (r / rows - 0.5) * 0.36
        )
      }
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = r * (cols + 1) + c
        idxs.push(a, a + 1, a + cols + 1, a + 1, a + cols + 2, a + cols + 1)
      }
    }

    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    g.setIndex(idxs)
    g.computeVertexNormals()
    return g
  }, [])

  useFrame((s) => {
    const t = s.clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * (active ? 0.9 : 0.3)) * 0.5
    ref.current.rotation.x = Math.sin(t * (active ? 0.55 : 0.2)) * 0.22
  })

  return (
    <mesh ref={ref} geometry={geo} castShadow={false} receiveShadow={false}>
      <meshPhysicalMaterial
        {...goldProps}
        roughness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
interface CardProps {
  card: (typeof CARDS)[0]
  targetX: number
  targetZ: number
  targetScale: number
  active: boolean
}

function GlassCard({ card, targetX, targetZ, targetScale, active }: CardProps) {
  const group = useRef<THREE.Group>(null!)
  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.84, 2.68, 0.09)),
    []
  )

  useFrame((_, dt) => {
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      dt * 7
    )
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      dt * 7
    )
    const s = THREE.MathUtils.lerp(group.current.scale.x, targetScale, dt * 7)
    group.current.scale.setScalar(s)
  })

  return (
    <group ref={group} position={[targetX, 0, targetZ]}>
      <Float
        speed={active ? 2.2 : 1.1}
        rotationIntensity={active ? 0.07 : 0.025}
        floatIntensity={active ? 0.18 : 0.07}
      >
        {/* ── Glass body ── */}
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={[1.82, 2.65, 0.08]} />
          <MeshTransmissionMaterial
            samples={2}
            resolution={256}
            thickness={0.08}
            roughness={0.04}
            transmission={0.96}
            ior={1.5}
            chromaticAberration={active ? 0.04 : 0.01}
            anisotropy={0.08}
            distortion={0.04}
            distortionScale={0.15}
            temporalDistortion={0.01}
            color={active ? '#3D2A1A' : '#1C1208'}
            attenuationColor={GOLD}
            attenuationDistance={0.6}
            transparent
            opacity={active ? 1 : 0.6}
          />
        </mesh>

        {/* ── Gold edge glow ── */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial
            color={GOLD}
            transparent
            opacity={active ? 0.55 : 0.18}
          />
        </lineSegments>

        {/* ── 3D Icon ── */}
        <group position={[0, 0.48, 0.12]}>
          {card.id === 0 && <TorusIcon active={active} />}
          {card.id === 1 && <DiamondIcon active={active} />}
          {card.id === 2 && <WaveIcon active={active} />}
        </group>

        {/* ── HTML Text overlay ── */}
        <Html
          position={[0, -0.58, 0.1]}
          center
          distanceFactor={4}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              textAlign: 'center',
              width: '155px',
              opacity: active ? 1 : 0.5,
              transition: 'opacity 0.35s ease',
            }}
          >
            <div
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: active ? '21px' : '17px',
                fontWeight: 400,
                color: CREAM,
                letterSpacing: '0.04em',
                marginBottom: '3px',
                transition: 'font-size 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '8px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: '9px',
              }}
            >
              {card.subtitle}
            </div>
            <div
              style={{
                width: '36px',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                margin: '0 auto 9px',
              }}
            />
            {card.items.map((item) => (
              <div
                key={item}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '7.5px',
                  color: 'rgba(245,237,216,0.55)',
                  letterSpacing: '0.06em',
                  marginBottom: '2.5px',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </div>
            ))}
            <div
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '13px',
                color: GOLD,
                fontStyle: 'italic',
                marginTop: '7px',
              }}
            >
              {card.price}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      <Environment preset="city" />
      {CARDS.map((card, i) => {
        const offset = i - activeIndex
        return (
          <GlassCard
            key={card.id}
            card={card}
            targetX={offset * SPACING}
            targetZ={offset === 0 ? 0 : -0.9}
            targetScale={offset === 0 ? 1 : 0.76}
            active={i === activeIndex}
          />
        )
      })}
    </>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function MenuGallery3D() {
  const [activeIndex, setActiveIndex] = useState(1)

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -60 && activeIndex < CARDS.length - 1) {
        setActiveIndex((i) => i + 1)
      } else if (info.offset.x > 60 && activeIndex > 0) {
        setActiveIndex((i) => i - 1)
      }
    },
    [activeIndex]
  )

  return (
    <section
      id="menu"
      style={{
        width: '100%',
        background: '#000000',
        padding: '90px 0 64px',
        position: 'relative',
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: GOLD,
            marginBottom: '12px',
          }}
        >
          Curated Selections
        </div>
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(38px, 7vw, 64px)',
            fontWeight: 300,
            color: CREAM,
            lineHeight: 1,
            marginBottom: '10px',
          }}
        >
          An Extraordinary Menu
        </h2>
        <p
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '10px',
            color: 'rgba(245,237,216,0.3)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Swipe to Explore
        </p>
      </div>

      {/* ── 3D Canvas with drag ── */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
        style={{
          width: '100%',
          height: '500px',
          touchAction: 'none',
          cursor: 'grab',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
          }}
          style={{ background: 'transparent' }}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <Scene activeIndex={activeIndex} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '22px',
        }}
      >
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${CARDS[i].label}`}
            style={{
              width: i === activeIndex ? '26px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background:
                i === activeIndex ? GOLD : 'rgba(201,169,110,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* ── Active label ── */}
      <p
        style={{
          textAlign: 'center',
          marginTop: '16px',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '19px',
          color: GOLD,
          fontStyle: 'italic',
          letterSpacing: '0.03em',
        }}
      >
        {CARDS[activeIndex].label} &nbsp;·&nbsp; {CARDS[activeIndex].price}
      </p>

      {/* ── Reserve CTA ── */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a
          href="#reservations"
          style={{
            display: 'inline-block',
            padding: '14px 44px',
            border: `1px solid ${GOLD}`,
            color: GOLD,
            fontFamily: 'Jost, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = GOLD
            e.currentTarget.style.color = '#1C1208'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = GOLD
          }}
        >
          Book Your Table
        </a>
      </div>
    </section>
  )
}