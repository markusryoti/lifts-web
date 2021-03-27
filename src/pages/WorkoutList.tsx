import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { parseDate } from '../util/time';

import dotenv from 'dotenv';
import Movements from '../components/Movements';

dotenv.config();

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

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<IWorkout[] | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/workouts`)
      .then(res => setWorkouts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">My Workouts</h1>
      <div className="has-text-centered mb-3 is-flex-direction-column">
        <p className="mb-1">Create New</p>
        <Link to="/new">
          <i className="fas fa-3x fa-plus-circle"></i>
        </Link>
      </div>
      {workouts &&
        workouts.map((workout: IWorkout) => {
          return (
            <div className="box" key={workout.workout_id}>
              <div className="is-flex is-justify-content-space-between">
                <div className="mb-5">
                  <h4 className="title is-4 mb-1">{workout.workout_name}</h4>
                  <p>{parseDate(workout.workout_created_at)}</p>
                </div>
                <Link to={`/workouts/${workout.workout_id}`}>
                  <i className="fas fa-2x fa-eye"></i>
                </Link>
              </div>
              <Movements sets={workout.sets} />
            </div>
          );
        })}
    </div>
  );
};

export default WorkoutList;
