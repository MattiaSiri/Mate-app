import React, { useState } from 'react';
import { FaMars, FaVenus, FaGenderless, FaQuestion } from 'react-icons/fa';
import Question from './Question';

export default function GenderQuestionExample() {
  const [gender, setGender] = useState<string | number>('M');

  const options = [
    { label: 'M', icon: <FaMars />, value: 'M' },
    { label: 'F', icon: <FaVenus />, value: 'F' },
    { label: 'Altro', icon: <FaGenderless />, value: 'X' },
    { label: 'Pnts', icon: <FaQuestion />, value: 'N' },
  ];

  return (
    <div className="space-y-4">
      <p className="font-semibold">Seleziona il tuo genere:</p>
      <Question
        question="Genere"
        options={options}
        selectedValue={gender}
        onChange={setGender}
      />
      <p className="text-sm text-gray-600">Valore selezionato: {gender}</p>
    </div>
  );
}
