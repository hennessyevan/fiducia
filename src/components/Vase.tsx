import { Paper } from '@/components/Paper'
import {
  Backdrop,
  BakeShadows,
  Environment,
  SoftShadows,
  Stage,
} from '@react-three/drei'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { motion, MotionCanvas } from 'framer-motion-3d'
import { useMemo } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons'

const vaseVariants = {
  initial: {
    scale: 10,
    rotateX: Math.PI / 0.5,
    y: -2.7,
    opacity: 0,
    transition: { type: 'linear' },
  },
  animate: { scale: 10, rotateX: Math.PI / 0.5, y: -2.75, opacity: 1 },
  hover: { scale: 11, rotateX: Math.PI / 0.44, y: -2, z: -3 },
}

function VaseObj() {
  const obj = useLoader(OBJLoader, '/models/vase/vase_3.obj')

  if (obj.children[0] instanceof THREE.Mesh === false) return null

  return (
    <motion.mesh
      position={[0, -2.6, -2]}
      geometry={obj.children[0].geometry}
      variants={vaseVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      castShadow
    >
      <motion.meshPhysicalMaterial
        roughness={0.8}
        metalness={1}
        emissive={new THREE.Color(0x366491)}
        emissiveIntensity={0.5}
        color={new THREE.Color(0xdd8082)}
      />
      <motion.directionalLight
        intensity={50}
        transition={{
          repeat: Infinity,
          duration: 10,
          repeatType: 'reverse',
          type: 'tween',
        }}
        initial={{ x: -500, y: -500, z: 50 }}
        animate={{ x: 500, y: 500, z: 5 }}
        position={[-10, 50, 5]}
        color={new THREE.Color(0xff8082)}
      />
      <motion.directionalLight
        intensity={25}
        transition={{
          repeat: Infinity,
          duration: 10,
          repeatType: 'reverse',
          type: 'tween',
        }}
        initial={{ x: 500, y: 500, z: 5 }}
        animate={{ x: -500, y: -500, z: 50 }}
        position={[-10, 50, 5]}
        color={new THREE.Color(0x366491)}
      />
    </motion.mesh>
  )
}

export function Vase() {
  useMemo(() => extend(THREE), [])

  return (
    <div className="size-full py-12 absolute top-0 left-1/2 -z-10 -translate-x-1/2">
      <MotionCanvas
        shadows
        className="size-full mx-auto md:max-w-[500px] md:ml-0"
      >
        {/* <Backdrop floor={1} receiveShadow> */}
        {/* <Environment
            preset="warehouse"
            environmentIntensity={0.2}
            environmentRotation={[0, Math.PI / 2, 0]}
          /> */}
        {/* <ambientLight
            intensity={5}
            color={new THREE.Color(0xff8082)}
            position={[0, 2.7, 1]}
          />
          <ambientLight
            intensity={5}
            color={new THREE.Color(0x366491)}
            position={[0, 2.7, 1]}
          /> */}
        <Stage
          shadows="contact"
          adjustCamera
          intensity={0.5}
          environment="city"
        >
          <VaseObj />
          <Paper />
        </Stage>
        {/* </Backdrop> */}
      </MotionCanvas>
    </div>
  )
}
