import React, { useEffect, useState } from 'react';
import { parseDate } from '../util/time';

import dotenv from 'dotenv';
import axios from 'axios';
import { ISet, IWorkout } from './WorkoutList';
import EditView from '../components/EditView';
import Movements from '../components/Movements';

dotenv.config();

const Workout = (props: any) => {
  const { id } = props.match.params;

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

  const handleEditState = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setEditState(!editState);
  };

  const debug = true;

  return (
    <div className="container mt-5">
      <div className="card p-5">
        {debug && <pre>{JSON.stringify(workout).split(',').join(',\n')}</pre>}

        {workout &&
          (editState ? (
            <EditView
              workoutCopy={{ ...workout }}
              handleEditState={handleEditState}
            />
          ) : (
            <>
              <div className="is-flex is-justify-content-space-between">
                <div>
                  <h4 className="title is-4 mb-1">{workout.workout_name}</h4>
                  <p>{parseDate(workout.workout_created_at)}</p>{' '}
                </div>
                <div>
                  <button
                    className="button is-warning mr-2"
                    onClick={handleEditState}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="button is-danger"
                    onClick={() => {
                      console.log('deleting workout');
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <Movements movements={workout.movements} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Workout;
