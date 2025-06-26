import React, { ReactNode, forwardRef, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fire } from './ConfettiBurst';

export interface AnswerTileProps {
  label: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const AnswerTile = forwardRef<HTMLLabelElement, AnswerTileProps>(
  ({ label, icon, selected, onSelect }, ref) => {
    const prefersReduced = useReducedMotion();
    const labelRef = useRef<HTMLLabelElement | null>(null);

    const handleClick = () => {
      onSelect();
      if (!prefersReduced && labelRef.current) {
        const rect = labelRef.current.getBoundingClientRect();
        fire(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    };

    return (
      <motion.label
        ref={(node) => {
          labelRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLLabelElement | null>).current = node;
        }}
        role="radio"
        aria-checked={selected}
        tabIndex={0}
        className={
          `min-w-[140px] min-h-[56px] px-4 py-2 rounded-full border border-primary ` +
          `flex flex-col items-center justify-center transition-colors ` +
          `${selected ? 'bg-selected text-onSelected border-transparent' : 'text-primary'} ` +
          `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
        }
        initial={false}
        whileHover={!prefersReduced && !selected ? { scale: 1.05, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } : {}}
        whileTap={!prefersReduced && !selected ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.15 }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input type="radio" hidden checked={selected} onChange={() => {}} />
        <span className="mb-1 pointer-events-none">{icon}</span>
        <span className="pointer-events-none">{label}</span>
      </motion.label>
    );
  }
);

export default AnswerTile;
