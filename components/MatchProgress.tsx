import React from 'react';
import { motion } from 'framer-motion';

export interface MatchProgressProps {
  selectedCount: number;
  total: number;
}

export default function MatchProgress({ selectedCount, total }: MatchProgressProps) {
  const percent = total ? (selectedCount / total) * 100 : 0;
  return (
    <div className="sticky top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <motion.div
        className="h-full"
        style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)', backgroundSize: '200% 100%' }}
        animate={{ width: `${percent}%`, backgroundPosition: '100% 0' }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
      />
    </div>
  );
}
