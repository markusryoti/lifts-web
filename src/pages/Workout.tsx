import React, { useEffect, useState } from 'react';
import { parseDate } from '../util/time';

import dotenv from 'dotenv';
import axios from 'axios';
import { ISet, IWorkout } from './WorkoutList';
import Sets from '../components/Sets';

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
        setWorkout({ ...res.data });
        setEditedWorkout({ ...res.data });
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
    setEditedWorkout({ ...workout } as IWorkout); // restore
  };

  const handleValueChange = (e: any) => {
    const targetName = e.target.name;
    const value = e.target.value;

    // TODO
    // Maybe other things as well
    if (!value) {
      e.target.value = '';
    }

    if (targetName === 'workoutName') {
      setEditedWorkout({
        ...editedWorkout,
        workout_name: value,
      } as IWorkout);
      return;
    }

    const setId = e.target.parentNode.getAttribute('id') as string;

    let newSets;
    if (targetName === 'movementName') {
      const originalName = editedWorkout?.sets.find(
        set => String(set.set_id) === setId
      )?.movement_name;

      newSets = editedWorkout?.sets.map((set: ISet) => {
        const setCopy = { ...set };
        if (setCopy.movement_name === originalName) {
          setCopy.movement_name = value;
        }
        return setCopy;
      });
    } else if (targetName === 'reps') {
      newSets = editedWorkout?.sets.map((set: ISet) => {
        const setCopy = { ...set };
        if (String(setCopy.set_id) === setId) {
          setCopy.reps = parseInt(value);
        }
        return setCopy;
      });
    } else if (targetName === 'weight') {
      newSets = editedWorkout?.sets.map((set: ISet) => {
        const setCopy = { ...set };
        if (String(setCopy.set_id) === setId) {
          setCopy.weight = parseInt(value);
        }
        return setCopy;
      });
    }

    setEditedWorkout({
      ...editedWorkout,
      sets: newSets,
    } as IWorkout);
  };

  const handleSetDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const setId = e.currentTarget.parentElement?.getAttribute('id');
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${id}/sets/${setId}`
      )
      .then(res => {
        if (res.status === 200) {
          if (editedWorkout && workout) {
            const newSets: Array<ISet> = editedWorkout.sets.filter(
              (set: ISet) => {
                const setCopy = { ...set };
                if (String(setCopy.set_id) === setId) {
                  return false;
                }
                return true;
              }
            );
            setEditedWorkout({
              ...editedWorkout,
              sets: newSets,
            });
            axios
              .get(`${process.env.REACT_APP_API_BASE_URL}/workouts/${id}`)
              .then(res => {
                setWorkout({ ...res.data });
              })
              .catch(err => console.log(err));
          }
        }
      })
      .catch(err => console.error(err));
  };

  const handleMovementDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const setId = e.currentTarget.parentElement?.getAttribute('id');
    const searchedMovementName = editedWorkout?.sets.find(
      set => String(set.set_id) === setId
    )?.movement_name;

    let newSets: Array<ISet>;
    if (workout && editedWorkout) {
      newSets = editedWorkout?.sets.filter(
        (set: ISet) => set.movement_name !== searchedMovementName
      );
    }

    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${id}/sets/${searchedMovementName}`
      )
      .then(res => {
        if (res.status === 200) {
          setEditedWorkout({
            ...editedWorkout,
            sets: newSets,
          } as IWorkout);
        }
      })
      .catch(err => console.error(err));
  };

  const handleSave = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${id}`,
        editedWorkout
      )
      .then(res => {
        if (res.status === 200) {
          props.history.push('/workouts');
        }
      })
      .catch(err => console.error(err));
  };

  const debug = true;

  return (
    <div className="container mt-5">
      <div className="card p-5">
        {debug && (
          <pre>{JSON.stringify(editedWorkout).split(',').join(',\n')}</pre>
        )}

        {workout &&
          editedWorkout &&
          (editState ? (
            <>
              <div className="is-flex is-justify-content-space-between">
                <div>
                  <input
                    className="input mb-1"
                    id="workoutName"
                    name="workoutName"
                    placeholder={editedWorkout.workout_name}
                    onChange={handleValueChange}
                  />
                  <input
                    className="input"
                    disabled
                    value={parseDate(editedWorkout.workout_created_at)}
                  />
                </div>
                <div>
                  <button
                    className="button is-success mr-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
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
                {editedWorkout.sets.map((set: ISet, index) => {
                  if (editedWorkout.sets.length > 0) {
                    if (
                      index === 0 ||
                      set.movement_name !==
                        editedWorkout.sets[index - 1].movement_name
                    ) {
                      return (
                        <div
                          key={set.set_id}
                          id={set.set_id}
                          className={index !== 0 ? 'mt-3' : ''}
                          onChange={handleValueChange}
                        >
                          <input
                            className="input is-5 mb-1"
                            name="movementName"
                            placeholder={set.movement_name}
                            style={inputWidth}
                          />

                          <button
                            className="button is-danger is-small"
                            onClick={handleMovementDelete}
                          >
                            Remove Movement <i className="fas fa-trash-alt"></i>
                          </button>

                          <li key={set.set_id} id={set.set_id}>
                            <input
                              type="number"
                              min="0"
                              className="input"
                              name="reps"
                              placeholder={set.reps.toString()}
                              style={inputWidth}
                            />{' '}
                            x{' '}
                            <input
                              type="number"
                              min="0"
                              className="input"
                              name="weight"
                              placeholder={set.weight.toString()}
                              style={inputWidth}
                            />{' '}
                            kg{' '}
                            <button
                              className="button is-danger is-small"
                              onClick={handleSetDelete}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </li>
                        </div>
                      );
                    }
                  }

                  return (
                    <li
                      key={set.set_id}
                      id={set.set_id}
                      onChange={handleValueChange}
                    >
                      <input
                        type="number"
                        min="0"
                        className="input"
                        name="reps"
                        placeholder={set.reps.toString()}
                        style={inputWidth}
                      />{' '}
                      x{' '}
                      <input
                        type="number"
                        min="0"
                        className="input"
                        name="weight"
                        placeholder={set.weight.toString()}
                        style={inputWidth}
                      />{' '}
                      kg{' '}
                      <button
                        className="button is-danger is-small"
                        onClick={handleSetDelete}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
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
                <Sets sets={workout.sets} />
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
