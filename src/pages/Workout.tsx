import React, { useEffect, useState } from 'react';
import { parseDate } from '../util/time';

import dotenv from 'dotenv';
import axios from 'axios';
import { ISet, IWorkout } from './WorkoutList';

dotenv.config();

const Workout = (props: any) => {
  const { id } = props.match.params;

  const [editState, setEditState] = useState<boolean>(false);
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [editedWorkout, setEditedWorkout] = useState<IWorkout | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/workouts/${id}`)
      .then(res => {
        setWorkout(res.data);
        setEditedWorkout(res.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/workouts/${id}`)
      .then(res => {
        if (res.status === 200) {
          props.history.push('/workouts');
        }
      })
      .catch(err => console.error(err));
  };

  const handleEditState = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setEditState(!editState);
  };

  const renderSets = (sets: ISet[]) => {
    return sets.map((set: ISet, index) => {
      if (sets.length > 1) {
        if (
          index === 0 ||
          set.movement_name !== sets[index - 1].movement_name
        ) {
          return (
            <div key={set.set_id} className={index !== 0 ? 'mt-3' : ''}>
              <h5 className="subtitle is-5 mb-1">{set.movement_name}</h5>
              <li>
                {set.reps} x {set.weight} kg
              </li>
            </div>
          );
        }
      }

      return (
        <li key={set.set_id}>
          {set.reps} x {set.weight} kg
        </li>
      );
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-5">
        {workout &&
          (editState ? (
            <>
              <div className="is-flex is-justify-content-space-between">
                <div>
                  <input
                    className="input mb-1"
                    placeholder={workout.workout_name}
                  />
                  <input
                    className="input"
                    placeholder={parseDate(workout.workout_created_at)}
                  />
                </div>
                <div>
                  <button
                    className="button is-info mr-2"
                    onClick={handleEditState}
                  >
                    Discard
                  </button>
                  <button className="button is-danger" onClick={handleDelete}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>

              <ul>
                {workout.sets.map((set: ISet, index) => {
                  if (workout.sets.length > 1) {
                    if (
                      index === 0 ||
                      set.movement_name !==
                        workout.sets[index - 1].movement_name
                    ) {
                      return (
                        <div
                          key={set.set_id}
                          className={index !== 0 ? 'mt-3' : ''}
                        >
                          <input
                            className="input is-5 mb-1"
                            placeholder={set.movement_name}
                            style={inputWidth}
                          />

                          <li key={set.set_id}>
                            <input
                              className="input"
                              placeholder={set.reps.toString()}
                              style={inputWidth}
                            />{' '}
                            x{' '}
                            <input
                              className="input"
                              placeholder={set.weight.toString()}
                              style={inputWidth}
                            />{' '}
                            kg
                          </li>
                        </div>
                      );
                    }
                  }

                  return (
                    <li key={set.set_id}>
                      <input
                        className="input"
                        placeholder={set.reps.toString()}
                        style={inputWidth}
                      />{' '}
                      x{' '}
                      <input
                        className="input"
                        placeholder={set.weight.toString()}
                        style={inputWidth}
                      />{' '}
                      kg{' '}
                    </li>
                  );
                })}
              </ul>
            </>
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
                  <button className="button is-danger" onClick={handleDelete}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <ul>{renderSets(workout.sets)}</ul>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

const inputWidth = {
  width: '100px',
};

export default Workout;
