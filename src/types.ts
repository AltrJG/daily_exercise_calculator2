export interface Exercise {
  type: string;
  duration: number;
  weight: number;
}

export interface ExerciseEntry extends Exercise {
  id: number;
  calories: number;
}