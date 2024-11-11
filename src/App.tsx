import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { Exercise, ExerciseEntry } from './types';
import ExerciseForm from './components/ExerciseForm';
import ExerciseList from './components/ExerciseList';
import TotalCalories from './components/TotalCalories';

function App() {
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [editingExercise, setEditingExercise] = useState<ExerciseEntry | null>(null);

  const calculateCalories = (exercise: Exercise): number => {
    const metValues: { [key: string]: number } = {
      running: 8.0,
      cycling: 7.5,
      swimming: 6.0,
      walking: 3.5,
      yoga: 2.5,
    };
    const met = metValues[exercise.type];
    const durationInHours = exercise.duration / 60;
    return Math.round(met * exercise.weight * durationInHours);
  };

  const handleAddExercise = (exercise: Exercise) => {
    const calories = calculateCalories(exercise);
    setExercises([...exercises, { ...exercise, calories, id: Date.now() }]);
  };

  const handleUpdateExercise = (exercise: ExerciseEntry) => {
    const calories = calculateCalories(exercise);
    setExercises(exercises.map(ex => 
      ex.id === exercise.id ? { ...exercise, calories } : ex
    ));
    setEditingExercise(null);
  };

  const handleDeleteExercise = (id: number) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Dumbbell className="w-8 h-8 text-[var(--neon-cyan)]" />
            <h1 className="text-3xl font-bold text-white">Calculadora de Calorías</h1>
          </div>
          <p className="text-[var(--neon-blue)]">Registra tus ejercicios y calcula las calorías quemadas</p>
        </div>

        <div className="neon-container p-6 mb-6">
          <ExerciseForm 
            onSubmit={handleAddExercise}
            editingExercise={editingExercise}
            onUpdate={handleUpdateExercise}
            onCancel={() => setEditingExercise(null)}
          />
        </div>

        <div className="space-y-6">
          <ExerciseList 
            exercises={exercises}
            onEdit={setEditingExercise}
            onDelete={handleDeleteExercise}
          />
          <TotalCalories exercises={exercises} />
        </div>
      </div>
    </div>
  );
}

export default App;