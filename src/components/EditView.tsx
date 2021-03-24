import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  const handleMovementNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.getElementsByTagName('input')[0].value;
    const lis = e.currentTarget.getElementsByTagName('li');

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

  return (
    <>
      {1 && (
        <pre>
          EDITVIEW{' '}
          {editedWorkout &&
            JSON.stringify(editedWorkout).split(',').join(',\n')}
        </pre>
      )}
      <div className="is-flex is-justify-content-space-between">
        <div>
          <input
            className="input mb-1"
            id="workoutName"
            name="workoutName"
            placeholder={editedWorkout?.workout_name}
            onChange={handleWorkoutNameChange}
          />
          <input
            disabled
            className="input is-6"
            placeholder={
              editedWorkout ? parseDate(editedWorkout?.workout_created_at) : ''
            }
          />
        </div>
        <div>
          <button className="button is-success mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="button is-info mr-2" onClick={toggleEditState}>
            Discard
          </button>
          <button className="button is-danger" onClick={handleWorkoutDelete}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div>
        <ul>
          {Object.keys(editedWorkout?.movements).map(
            (movement: string, index: number) => {
              return (
                <div
                  key={`${movement}-${index}`}
                  onChange={handleMovementNameChange}
                >
                  <input
                    name="movementName"
                    className="input is-5 mb-2 mt-2"
                    placeholder={movement}
                  />
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
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default EditView;
