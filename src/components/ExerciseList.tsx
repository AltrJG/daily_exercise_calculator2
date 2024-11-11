import React from 'react';
import { ExerciseEntry } from '../types';
import { Timer, Weight, Flame, Edit2, Trash2 } from 'lucide-react';

interface ExerciseListProps {
  exercises: ExerciseEntry[];
  onEdit: (exercise: ExerciseEntry) => void;
  onDelete: (id: number) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onEdit, onDelete }) => {
  const getExerciseName = (type: string): string => {
    const names: { [key: string]: string } = {
      running: 'Correr',
      cycling: 'Ciclismo',
      swimming: 'Natación',
      walking: 'Caminar',
      yoga: 'Yoga',
    };
    return names[type] || type;
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--neon-blue)] neon-container">
        No hay ejercicios registrados aún
      </div>
    );
  }

  return (
    <div className="neon-container p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Ejercicios Registrados</h2>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="border border-[var(--neon-blue)] rounded-lg p-4 hover:border-[var(--neon-pink)] transition-colors bg-[rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                {getExerciseName(exercise.type)}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[var(--neon-cyan)]">
                  <Flame className="w-5 h-5" />
                  <span className="font-semibold">{exercise.calories} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(exercise)}
                    className="p-1 text-[var(--neon-cyan)] hover:text-[var(--neon-pink)] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(exercise.id)}
                    className="p-1 text-[var(--neon-pink)] hover:text-[var(--neon-purple)] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-[var(--neon-blue)]">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <span>{exercise.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Weight className="w-4 h-4" />
                <span>{exercise.weight} kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;