import { useCloseMenuOnEscape } from '@/hooks/useCloseOnEscape'
import { RoundedBox, Text, useCursor } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAnimate, useAnimationFrame } from 'framer-motion'
import * as THREE from 'three'

const paperVariants = {
  idle: {
    x: -0.45,
    y: -2.75,
    z: 0,
    rotateZ: 0.9,
    rotateX: -Math.PI / 2,
    scale: 0.3,
    transition: {
      rotateX: { duration: 0.1 },
    },
  },
  active: { x: 0, y: -2, z: 0, rotateX: -0.2, rotateZ: 0, scale: 0.8 },
  hover: { scale: 0.33, y: -2.72 },
}

function PaperInput({ active = false }: { active?: boolean }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [showCaret, setShowCaret] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCaret((show) => !show)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (active) {
      setFocused(true)
    } else {
      setFocused(false)
    }
  }, [active])

  useEffect(() => {
    if (!textareaRef.current) {
      const textarea = document.createElement('textarea')
      textarea.style.position = 'absolute'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textareaRef.current = textarea
    }

    textareaRef.current.addEventListener('input', (e) => {
      setText(e.currentTarget.value)
    })
  }, [focused, textareaRef])

  useEffect(() => {
    if (focused) {
      textareaRef.current?.focus()
    } else {
      textareaRef.current?.blur()
    }

    const focus = () => {
      if (focused) {
        textareaRef.current?.focus()
      }
    }

    textareaRef.current?.addEventListener('blur', focus)

    return () => {
      textareaRef.current?.removeEventListener('blur', focus)
    }
  }, [focused])

  return (
    <Text
      fontSize={0.1}
      whiteSpace="overflowWrap"
      color="#000000"
      fillOpacity={active ? 0.8 : 0}
      maxWidth={2}
      position={[-1, 0.6, 0.01]}
      anchorX="left"
      anchorY="top"
      fontWeight={500}
      font="fonts/poppinsMedium.ttf"
      onClick={() => setFocused(true)}
    >
      {text}
      {focused && showCaret ? '|' : ''}
    </Text>
  )
}

export function Paper() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  useCursor(active && hovered, 'text')
  useCursor(!active && hovered, 'pointer')

  useCloseMenuOnEscape({
    isMenuOpen: active,
    toggleMenu: () => setActive(!active),
  })

  return (
    <motion.mesh
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[0, -2, 0]}
      rotation={[-0.2, 0, 0]}
      variants={paperVariants}
      initial="idle"
      animate={active ? 'active' : 'idle'}
      whileHover={active ? 'active' : 'hover'}
      onClick={() => {
        setActive(true)
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
        <PaperInput active={active} />
      </RoundedBox>
    </motion.mesh>
  )
}
