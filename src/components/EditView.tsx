import axios from 'axios';
import React, { useState } from 'react';
import { IWorkout } from '../pages/WorkoutList';
import { parseDate } from '../util/time';
import SetEditItem from './SetEditItem';

interface Props {
  history?: any; // React router
  workoutCopy: any;
  toggleEditState: any;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout | null>>;
  handleWorkoutDelete: () => void;
}

const EditView = ({
  workoutCopy,
  toggleEditState,
  setWorkout,
  handleWorkoutDelete,
  history,
}: Props) => {
  const [editedWorkout, setEditedWorkout] = useState<IWorkout>({
    ...workoutCopy,
  });

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

  return (
    <>
      {1 && (
        <pre>
          EDITVIEW {JSON.stringify(editedWorkout).split(',').join(',\n')}
        </pre>
      )}
      <div className="is-flex is-justify-content-space-between">
        <div>
          <input
            className="input mb-1"
            id="workoutName"
            name="workoutName"
            placeholder={editedWorkout?.workout_name}
          />
          <h6 className="subtitle is-6">
            {editedWorkout ? parseDate(editedWorkout?.workout_created_at) : ''}
          </h6>
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
                <div key={`${movement}-${index}`}>
                  <h5 className="title is-5 mb-2 mt-2">{movement}</h5>
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
