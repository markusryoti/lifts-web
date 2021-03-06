import React, { useEffect, useState } from 'react';
import { parseDate } from '../util/time';

import dotenv from 'dotenv';
import axios from 'axios';
import EditView from '../components/EditView';
import Movements from '../components/Movements';
import { useParams } from 'react-router-dom';
import { IWorkout } from '../types';

dotenv.config();

const Workout = (props: any) => {
  let { id } = useParams<{ id: string }>();

  const [editState, setEditState] = useState<boolean>(false);
  const [workout, setWorkout] = useState<IWorkout | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/workouts/${id}`)
      .then(res => {
        setWorkout({ ...res.data });
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  const toggleEditState = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setEditState(!editState);
  };

  const handleWorkoutDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const res = confirm('Are you sure? Cannot be reverted');
    if (!res) return;

    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${workout?.workout_id}`
      )
      .then(res => {
        if (res.status === 200) {
          props.history.push('/workouts');
        }
      })
      .catch(err => console.error(err));
  };

  const debugJson = false;

  return (
    <div className="container mt-5">
      <div className="card p-5">
        {workout &&
          (editState ? (
            <EditView
              workout={workout}
              toggleEditState={toggleEditState}
              setWorkout={setWorkout}
              handleWorkoutDelete={handleWorkoutDelete}
            />
          ) : (
            <>
              {debugJson && (
                <pre>
                  WORKOUT {JSON.stringify(workout).split(',').join(',\n')}
                </pre>
              )}
              <div className="is-flex is-justify-content-space-between">
                <div>
                  <h4 className="title is-4 mb-1">{workout.workout_name}</h4>
                  <p>{parseDate(workout.workout_created_at)}</p>{' '}
                </div>
                <div>
                  <button
                    className="button is-warning mr-2"
                    onClick={toggleEditState}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="button is-danger"
                    onClick={handleWorkoutDelete}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <Movements sets={workout.sets} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Workout;
