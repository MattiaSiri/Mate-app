import React, { useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface AvatarBuilderProps {
  selectedTraits: string[];
}

interface StickerPos {
  x: number;
  y: number;
}

export default function AvatarBuilder({ selectedTraits }: AvatarBuilderProps) {
  const prefersReduced = useReducedMotion();

  const positions = useMemo<StickerPos[]>(() => {
    const taken: StickerPos[] = [];
    function randomPos(): StickerPos {
      const r = 70; // radius inside circle
      return {
        x: Math.random() * r * 2 - r,
        y: Math.random() * r * 2 - r,
      };
    }
    for (let i = 0; i < selectedTraits.length && i < 8; i++) {
      let pos = randomPos();
      let attempts = 0;
      while (
        taken.some((p) => Math.hypot(p.x - pos.x, p.y - pos.y) < 24) &&
        attempts < 10
      ) {
        pos = randomPos();
        attempts++;
      }
      taken.push(pos);
    }
    return taken;
  }, [selectedTraits]);

  return (
    <div className="w-40 h-40 rounded-full bg-gray-200 relative flex items-center justify-center text-center overflow-hidden">
      {selectedTraits.length === 0 && (
        <span className="text-sm px-2">Add traits to shape your Mate!</span>
      )}
      <AnimatePresence>
        {positions.map((pos, idx) => (
          <motion.span
            key={selectedTraits[idx]}
            className="absolute text-xl"
            style={{ left: '50%', top: '50%', transform: `translate(${pos.x}px, ${pos.y}px)` }}
            initial={prefersReduced ? false : { scale: 0.6, opacity: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ⭐
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
