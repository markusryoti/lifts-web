import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ISet, IWorkout } from '../pages/WorkoutList';
import { parseDate } from '../util/time';
import SetEditItem from './SetEditItem';

interface Props {
  workoutCopy: any;
  toggleEditState: any;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout | null>>;
  handleWorkoutDelete: () => void;
}

const EditView: React.FC<Props> = ({
  workoutCopy,
  toggleEditState,
  setWorkout,
  handleWorkoutDelete,
}) => {
  const [editedWorkout, setEditedWorkout] = useState<IWorkout>({
    ...workoutCopy,
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

    const userMovementId =
      editedWorkout.movements[movementName][0].user_movement_id;

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${editedWorkout.workout_id}/sets`,
        { reps: 0, weight: 0, userMovementId }
      )
      .then(res => {
        if (res.status === 200) {
          const updatedWorkout: IWorkout = { ...editedWorkout };
          updatedWorkout.movements[movementName].push({
            ...res.data,
            movement_name: movementName,
          });
          setEditedWorkout(updatedWorkout);
        }
      })
      .catch(err => console.error(err));
  };

  const handleMovementNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.getElementsByTagName('input')[0].value;

    const lis = e.currentTarget.parentElement?.getElementsByTagName('li');

    // Since lis can in theory be undefined
    // This shouldn't ever be an issue
    if (!lis) return;

    const setIdsToUpdate: number[] = [];
    for (let i = 0; i < lis.length; i++) {
      setIdsToUpdate.push(parseInt(lis[i].id));
    }

    const updatedWorkout: IWorkout = JSON.parse(JSON.stringify(editedWorkout));
    Object.keys(editedWorkout.movements).forEach((movement: string) => {
      const newMovementSets = editedWorkout.movements[movement].map(
        (set: ISet) => {
          if (setIdsToUpdate.includes(parseInt(set.set_id))) {
            return {
              ...set,
              movement_name: inputValue,
              user_movement_id: null,
            };
          }
          return set;
        }
      );
      updatedWorkout.movements[movement] = newMovementSets;
    });

    setEditedWorkout(updatedWorkout);
  };

  const debugJson = false;

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
            placeholder={editedWorkout?.workout_name}
            onChange={handleWorkoutNameChange}
          />
          <input
            disabled
            className="input"
            placeholder={
              editedWorkout ? parseDate(editedWorkout?.workout_created_at) : ''
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
          {Object.keys(editedWorkout?.movements).map(
            (movement: string, index: number) => {
              return (
                <div className="card mb-5 p-5" key={`${movement}-${index}`}>
                  <div
                    onChange={handleMovementNameChange}
                    className="is-flex is-align-items-center is-flex-wrap-wrap mb-2"
                  >
                    <input
                      name="movementName"
                      className="input is-5 mb-2 mt-2 mr-2 is-flex-grow-2"
                      placeholder={movement}
                    />
                  </div>
                  <div>
                    <div className="pb-4">
                      {editedWorkout?.movements[movement].map((set: any) => {
                        return (
                          <SetEditItem
                            key={set.set_id}
                            id={set.set_id}
                            set={set}
                            editedWorkout={editedWorkout}
                            setEditedWorkout={setEditedWorkout}
                            setWorkout={setWorkout}
                          />
                        );
                      })}
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
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default EditView;
