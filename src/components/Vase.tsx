import {
  Billboard,
  CameraControls,
  OrthographicCamera,
  useTexture,
} from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  Box3,
  Color,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  Vector2,
  Vector3,
} from 'three'
import CSM from 'three-custom-shader-material'
import { OBJLoader } from 'three/addons'
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import CSMfragmentShader from '../assets/shaders/fragment.glsl'
import CSMvertexShader from '../assets/shaders/vertex.glsl'

const TEXTURES = {
  map: '/textures/cracked/albedo.png',
  ao: '/textures/cracked/ao.png',
  depth: '/textures/cracked/Height.png',
  metallic: '/textures/cracked/Metallic.png',
  normal: '/textures/cracked/Normal-ogl.png',
  roughness: '/textures/cracked/Roughness.png',
} as const

function VaseObj() {
  const obj = useLoader(OBJLoader, '/models/vase/vase.obj')
  const textures = useTexture(TEXTURES)
  useTexture.preload(TEXTURES)

  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry = toCreasedNormals(child.geometry, (50 / 180) * Math.PI)
    }
  })

  useEffect(() => {
    for (const prop in textures) {
      textures[prop].flipY = false
      textures[prop].wrapS = RepeatWrapping
      textures[prop].wrapT = RepeatWrapping
      textures[prop].repeat.set(0.05, 0.05)
    }
  }, [textures])

  if (obj.children[0] instanceof Mesh === false) return null

  const scale = Math.min(window.innerWidth, 1000) / (window.innerWidth + 100)

  return (
    <>
      <mesh
        scale={[scale, scale, scale]}
        position={[0, -100, 0]}
        geometry={obj.children[0].geometry}
        castShadow
      >
        <CSM
          baseMaterial={
            new MeshStandardMaterial({
              color: '#0ff',
              roughness: 0.9,
              metalness: 0.0,
              map: textures.map,
              normalMap: textures.normal,
              metalnessMap: textures.metallic,
              aoMap: textures.ao,
              roughnessMap: textures.roughness,
              // wireframe: true,
              normalScale: new Vector2(0.25, 0.25),
            })
          }
          vertexShader={CSMvertexShader}
          fragmentShader={CSMfragmentShader}
          uniforms={{
            uTexture: { value: textures.map },
            uTextureNormal: { value: textures.normal },
            uTextureMetalness: { value: textures.metallic },
            uTextureAO: { value: textures.ao },
            uTextureRoughness: { value: textures.roughness },
            uTextureDisplacement: { value: textures.depth },
            uScale: { value: 25 },
          }}
        />
      </mesh>
    </>
  )
}

function InnerVase() {
  const directionRedLight = useRef<DirectionalLight>(null)
  const directionBlueLight = useRef<DirectionalLight>(null)

  useFrame(({ clock }) => {
    if (!directionRedLight.current || !directionBlueLight.current) return

    directionRedLight.current.position.x =
      Math.sin(clock.getElapsedTime() / 2) * 20

    directionBlueLight.current.position.x =
      Math.cos(clock.getElapsedTime() / 2) * 20
  })

  return (
    <>
      <Billboard follow={true} lockX lockY lockZ>
        <ambientLight intensity={0.5} color={new Color(0xff8082)} />
        <directionalLight
          ref={directionRedLight}
          intensity={20}
          position={[-10, 50, 5]}
          color={new Color(0xff8082)}
        />
        <directionalLight
          ref={directionBlueLight}
          intensity={35}
          position={[-10, -60, 5]}
          color={new Color(0x366491)}
        />
      </Billboard>

      <VaseObj />
    </>
  )
}

export function Vase() {
  return (
    <div className="w-full h-full absolute top-0 left-0 -z-10">
      <Canvas
        shadows
        style={{ height: '100%', width: '100%' }}
        camera={{ position: [0, 100, -275] }}
      >
        <InnerVase />
        {/* <CameraControls /> */}
        <group>
          <mesh
            receiveShadow
            // rotation-x={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeGeometry attach="geometry" args={[1000, 1000]} />
            <shadowMaterial attach="material" shadowSide={DoubleSide} />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}
