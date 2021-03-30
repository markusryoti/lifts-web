import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IWorkout, ISet } from '../types';
import { individualSetsToMovementSets } from '../util/setsToMovements';
import { parseDate } from '../util/time';
import SetEditItem from './SetEditItem';

interface Props {
  workout: IWorkout;
  toggleEditState: any;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout | null>>;
  handleWorkoutDelete: () => void;
}

const EditView: React.FC<Props> = ({
  workout,
  toggleEditState,
  setWorkout,
  handleWorkoutDelete,
}) => {
  const [editedWorkout, setEditedWorkout] = useState<IWorkout>({
    ...workout,
  });

  let history = useHistory();

  const handleSave = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${editedWorkout.workout_id}`,
        editedWorkout
      )
      .then(res => {
        if (res.status === 200) {
          history.push('/workouts');
        }
      })
      .catch(err => console.error(err));
  };

  const handleWorkoutNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    setEditedWorkout({ ...editedWorkout, workout_name: newName });
  };

  const addSet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const movementName = e.currentTarget.name;
    const userMovementId = editedWorkout.sets[0].user_movement_id;

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${editedWorkout.workout_id}/sets`,
        { reps: 0, weight: 0, userMovementId }
      )
      .then(res => {
        if (res.status === 200) {
          const updatedWorkout: IWorkout = { ...editedWorkout };
          updatedWorkout.sets.push({
            ...res.data,
            movement_name: movementName,
          });
          setEditedWorkout(updatedWorkout);
        }
      })
      .catch(err => console.error(err));
  };

  const handleMovementNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    const oldName = e.currentTarget.name;

    const newSets = editedWorkout.sets.map((set: ISet) => {
      if (set.movement_name === oldName) {
        return {
          ...set,
          movement_name: inputValue,
        };
      }
      return set;
    });

    setEditedWorkout({ ...editedWorkout, sets: newSets });
  };

  const handleMovementDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const movementToRemove = e.currentTarget.previousElementSibling?.getAttribute(
      'name'
    );
    const newSets = editedWorkout.sets.filter(
      set => set.movement_name !== movementToRemove
    );
    setEditedWorkout({ ...editedWorkout, sets: newSets });

    // Remove from api
  };

  const handleMovementAdd = () => {
    const newSet: ISet = {
      movement_name: 'New Movement',
      set_id: '',
      reps: 0,
      weight: 0,
      user_movement_id: '',
      set_created_at: Date.now().toString(),
    };

    const newSets = [...editedWorkout.sets];
    newSets.push(newSet);

    setEditedWorkout({
      ...editedWorkout,
      sets: newSets,
    });
  };

  const movementSets = individualSetsToMovementSets(editedWorkout.sets);
  const debugJson = true;

  return (
    <>
      {debugJson && (
        <pre>
          EDITVIEW{' '}
          {editedWorkout &&
            JSON.stringify(editedWorkout).split(',').join(',\n')}
        </pre>
      )}
      <div className="is-flex is-flex-wrap-wrap mt-2 mb-5">
        <div className="p-1 is-flex-grow-2 is-flex-wrap-wrap">
          <input
            className="input mb-1 mr-2"
            id="workoutName"
            name="workoutName"
            placeholder={editedWorkout.workout_name}
            onChange={handleWorkoutNameChange}
          />
          <input
            disabled
            className="input"
            placeholder={
              editedWorkout ? parseDate(editedWorkout.workout_created_at) : ''
            }
          />
        </div>
        <div className="is-flex is-align-items-center p-2">
          <button className="button is-success mr-2" onClick={handleSave}>
            <i className="fas fa-save" />
          </button>
          <button className="button is-info mr-2" onClick={toggleEditState}>
            <i className="fas fa-ban" />
          </button>
          <button className="button is-danger" onClick={handleWorkoutDelete}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr />
      <div>
        <ul>
          {movementSets &&
            Object.keys(movementSets).map((movement: string, index: number) => {
              return (
                <div className="card mb-5 p-5" key={`${index}`}>
                  <div className="is-flex is-align-items-center  mb-2">
                    <input
                      name={movement}
                      className="input is-5 mb-2 mt-2 mr-2 is-flex-grow-2"
                      placeholder={movement}
                      onChange={handleMovementNameChange}
                    />
                    <button
                      className="button is-danger"
                      onClick={handleMovementDelete}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <div>
                    <div className="pb-4">
                      {movementSets[movement].map(
                        (set: ISet, setIndex: number) => {
                          return (
                            <SetEditItem
                              key={set.set_id}
                              id={set.set_id}
                              set={set}
                              setIndex={setIndex}
                              editedWorkout={editedWorkout}
                              setEditedWorkout={setEditedWorkout}
                              setWorkout={setWorkout}
                            />
                          );
                        }
                      )}
                    </div>
                    <div>
                      <button
                        className="button is-link"
                        name={movement}
                        onClick={addSet}
                      >
                        Add Set
                        <i className=" ml-1 fas fa-plus-circle" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
      <button className="button is-info" onClick={handleMovementAdd}>
        Add Movement
        <i className=" ml-1 fas fa-plus-circle" />
      </button>
    </>
  );
};

export default EditView;
