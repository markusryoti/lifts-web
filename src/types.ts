export interface ISet {
  set_id: string;
  reps: number;
  weight: number;
  movement_name: string;
  user_movement_id: string | null;
  set_created_at: string;
}

export interface IWorkout {
  workout_id: string;
  workout_name: string;
  workout_created_at: string;
  sets: Array<ISet>;
}
