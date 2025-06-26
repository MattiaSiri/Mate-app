import React, { ReactNode, forwardRef } from 'react';

export interface AnswerTileProps {
  label: string;
  icon?: ReactNode;
  value: string | number;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Render a selectable tile acting as a radio button.
 */
const AnswerTile = forwardRef<HTMLLabelElement, AnswerTileProps>(
  ({ label, icon, value, selected, onSelect }, ref) => {
    return (
      <label
        ref={ref}
        role="radio"
        aria-checked={selected}
        tabIndex={0}
        className={
          `w-full max-w-[300px] h-[96px] px-4 py-3 rounded-[8px] border ` +
          `flex flex-col items-center justify-center transition-colors ` +
          `border-primary text-primary ` +
          `${selected ? 'bg-selected text-onSelected' : 'bg-transparent'} ` +
          `${!selected ? 'hover:shadow-md cursor-pointer' : ''} ` +
          `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`
        }
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onSelect();
          }
        }}
      >
        <input
          type="radio"
          className="hidden"
          value={value}
          checked={selected}
          onChange={() => {}}
        />
        {icon && <span className="mb-1">{icon}</span>}
        <span>{label}</span>
      </label>
    );
  }
);

export default AnswerTile;
