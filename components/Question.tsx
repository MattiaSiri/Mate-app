import React, { useRef } from 'react';
import AnswerTile from './AnswerTile';

export interface QuestionProps {
  question: string;
  options: { label: string; icon: React.ReactNode; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function Question({
  question,
  options,
  selectedValue,
  onChange,
}: QuestionProps) {
  const itemsRef = useRef<(HTMLLabelElement | null)[]>([]);

  const focusItem = (index: number) => {
    const el = itemsRef.current[index];
    if (el) el.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = itemsRef.current.findIndex((el) => el === document.activeElement);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
      focusItem(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
      focusItem(prev);
    }
  };

  return (
    <div role="radiogroup" aria-label={question} className="flex flex-wrap gap-4" onKeyDown={handleKeyDown}>
      {options.map((opt, idx) => (
        <AnswerTile
          key={opt.value}
          label={opt.label}
          icon={opt.icon}
          selected={selectedValue === opt.value}
          onSelect={() => onChange(opt.value)}
          ref={(el) => (itemsRef.current[idx] = el)}
        />
      ))}
    </div>
  );
}
