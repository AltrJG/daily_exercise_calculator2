import React from 'react';
import { ExerciseEntry } from '../types';
import { Flame } from 'lucide-react';

interface TotalCaloriesProps {
  exercises: ExerciseEntry[];
}

const TotalCalories: React.FC<TotalCaloriesProps> = ({ exercises }) => {
  const totalCalories = exercises.reduce((sum, exercise) => sum + exercise.calories, 0);

  return (
    <div className="neon-container p-6 bg-[rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--neon-cyan)]">Total Calorías Quemadas</h2>
          <p className="text-[var(--neon-blue)]">De todos los ejercicios</p>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="w-8 h-8 text-[var(--neon-pink)]" />
          <span className="text-3xl font-bold text-white">{totalCalories}</span>
          <span className="text-xl text-[var(--neon-pink)]">kcal</span>
        </div>
      </div>
    </div>
  );
};

export default TotalCalories;