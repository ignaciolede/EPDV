import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const MotionTag = useMemo(() => motion(Tag), [Tag])

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -32px 0px' }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  )
}
