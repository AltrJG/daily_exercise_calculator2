import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseEntry } from '../types';
import { PlusCircle, Save, X } from 'lucide-react';

interface ExerciseFormProps {
  onSubmit: (exercise: Exercise) => void;
  editingExercise: ExerciseEntry | null;
  onUpdate: (exercise: ExerciseEntry) => void;
  onCancel: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ 
  onSubmit, 
  editingExercise, 
  onUpdate, 
  onCancel 
}) => {
  const [exercise, setExercise] = useState<Exercise>({
    type: 'running',
    duration: 30,
    weight: 70,
  });

  useEffect(() => {
    if (editingExercise) {
      setExercise(editingExercise);
    }
  }, [editingExercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExercise) {
      onUpdate({ ...exercise, id: editingExercise.id, calories: editingExercise.calories });
    } else {
      onSubmit(exercise);
    }
    setExercise({ type: 'running', duration: 30, weight: 70 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {editingExercise ? (
          <Save className="w-5 h-5 text-[var(--neon-pink)]" />
        ) : (
          <PlusCircle className="w-5 h-5 text-[var(--neon-cyan)]" />
        )}
        <h2 className="text-xl font-semibold text-white">
          {editingExercise ? 'Editar Ejercicio' : 'Agregar Ejercicio'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--neon-cyan)] mb-1">
            Tipo de Ejercicio
          </label>
          <select
            value={exercise.type}
            onChange={(e) => setExercise({ ...exercise, type: e.target.value })}
            className="neon-input w-full rounded-lg focus:outline-none"
          >
            <option value="running">Correr</option>
            <option value="cycling">Ciclismo</option>
            <option value="swimming">Natación</option>
            <option value="walking">Caminar</option>
            <option value="yoga">Yoga</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--neon-cyan)] mb-1">
            Duración (minutos)
          </label>
          <input
            type="number"
            min="1"
            value={exercise.duration}
            onChange={(e) => setExercise({ ...exercise, duration: Number(e.target.value) })}
            className="neon-input w-full rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--neon-cyan)] mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            min="1"
            value={exercise.weight}
            onChange={(e) => setExercise({ ...exercise, weight: Number(e.target.value) })}
            className="neon-input w-full rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 neon-button text-white py-2 px-4 rounded-lg"
        >
          {editingExercise ? 'Guardar Cambios' : 'Agregar Ejercicio'}
        </button>
        {editingExercise && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[var(--neon-pink)] text-[var(--neon-pink)] hover:bg-[var(--neon-pink)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default ExerciseForm;