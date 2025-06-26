import React from 'react';
import { motion } from 'framer-motion';
import AnswerTile from './AnswerTile';

export interface QuestionBlockProps {
  title: string;
  options: { label: string; icon: React.ReactNode; value: string }[];
  selectedValue: string;
  onChange: (val: string) => void;
}

export default function QuestionBlock({
  title,
  options,
  selectedValue,
  onChange,
}: QuestionBlockProps) {
  return (
    <div aria-label={title} role="radiogroup" className="space-y-4">
      <p className="font-semibold text-lg">{title}</p>
      <motion.div
        className="flex flex-wrap gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {options.map((opt) => (
          <motion.div
            key={opt.value}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            <AnswerTile
              label={opt.label}
              icon={opt.icon}
              selected={selectedValue === opt.value}
              onSelect={() => onChange(opt.value)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
