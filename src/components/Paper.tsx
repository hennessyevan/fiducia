import {
  DragControls,
  RoundedBox,
  useKeyboardControls,
} from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import { useEffect, useState } from 'react'

const paperVariants = {
  idle: {
    x: -0.45,
    y: -2.75,
    z: 0,
    rotateZ: 0.9,
    rotateX: -Math.PI / 2,
    scale: 0.25,
  },
  active: { x: 0, y: -2, z: 0, rotateX: -0.2, rotateZ: 0, scale: 0.8 },
}

export function Paper() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    addEventListener('keypress', (e) => {
      if (e.key === 'Escape') setActive(false)
    })

    return () => removeEventListener('keypress', () => setActive(false))
  }, [])

  return (
    <motion.mesh
      position={[0, -2, 0]}
      rotation={[-0.2, 0, 0]}
      variants={paperVariants}
      initial="idle"
      animate={active ? 'active' : 'idle'}
      onTap={() => {
        setActive(!active)
      }}
      receiveShadow
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
    >
      <RoundedBox radius={0.02} args={[2.5, 1.5, 0]} receiveShadow>
        <meshStandardMaterial
          roughness={0.4}
          metalness={0.1}
          color="white"
          shadowSide={THREE.DoubleSide}
        />
      </RoundedBox>
    </motion.mesh>
  )
}
