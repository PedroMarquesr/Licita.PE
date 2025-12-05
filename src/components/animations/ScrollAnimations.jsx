// components/animations/ScrollAnimations.jsx
"use client"

import { motion as Motion } from "framer-motion"
// Animação de deslizar da esquerda
export function SlideFromLeft({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </Motion.div>
  )
}

// Animação de deslizar da direita
export function SlideFromRight({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </Motion.div>
  )
}

// Animação de flutuar para cima
export function FloatUp({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </Motion.div>
  )
}

// Animação de escala (crescendo)
export function ScaleIn({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </Motion.div>
  )
}

// Animação de flip (girar)
export function FlipIn({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </Motion.div>
  )
}

// Animação de tipo de máquina de escrever para textos
export function TypewriterText({ text, delay = 0 }) {
  return (
    <Motion.div
      initial={{ width: "0%" }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 1.5, delay, ease: "easeInOut" }}
      viewport={{ once: true }}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      {text}
    </Motion.div>
  )
}
