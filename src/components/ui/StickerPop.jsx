import { motion } from 'framer-motion'

export default function StickerPop({ src, rotate = 0, className = '', delay = 0 }) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: [0, 1.2, 1], opacity: 1, rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        scale: { duration: 0.45, times: [0, 0.6, 1], ease: ['easeIn', 'backOut'], delay },
        opacity: { duration: 0.12, delay },
        rotate: { duration: 0.45, ease: 'backOut', delay },
      }}
      className={`absolute object-contain drop-shadow-lg pointer-events-none select-none ${className}`}
    />
  )
}
