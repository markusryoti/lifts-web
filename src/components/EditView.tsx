import axios from 'axios';
import React from 'react';
import { ISet } from '../pages/WorkoutList';
import { parseDate } from '../util/time';

interface Props {
  editedWorkout: any;
  setEditedWorkout: any;
  handleValueChange: any;
  handleSave: any;
  handleEditState: any;
  handleDelete: any;
  handleMovementDelete: any;
  handleSetDelete: any;
}

const SetEditItem = ({ set, handleValueChange, handleSetDelete }: any) => {
  return (
    <li key={set.set_id} id={set.set_id} onChange={handleValueChange}>
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
      <button className="button is-danger is-small" onClick={handleSetDelete}>
        <i className="fas fa-times"></i>
      </button>
    </li>
  );
};

const EditView = ({
  editedWorkout,
  setEditedWorkout,
  handleValueChange,
  handleSave,
  handleEditState,
  handleDelete,
  handleMovementDelete,
  handleSetDelete,
}: Props) => {
  const handleAddSetWithMovement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (editedWorkout && e.currentTarget.parentElement) {
      const setId = e.currentTarget.parentElement.getAttribute('id');
      const movementId = editedWorkout.sets.find(
        (set: ISet) => String(set.set_id) === setId
      ).user_movement_id;
      const workoutId = editedWorkout.workout_id;

      console.log('adding new set');
    }
  };

  return (
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
          <button className="button is-success mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="button is-info mr-2" onClick={handleEditState}>
            Discard
          </button>
          <button className="button is-danger" onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <ul>
        {editedWorkout &&
          editedWorkout.sets.map((set: ISet, index: number) => {
            if (editedWorkout.sets.length > 0) {
              if (
                index === 0 ||
                set.movement_name !==
                  editedWorkout.sets[index - 1].movement_name
              ) {
                return (
                  <>
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
                        className="button is-success is-small"
                        onClick={handleAddSetWithMovement}
                      >
                        Add set <i className="fas fa-plus"></i>
                      </button>

                      <button
                        className="button is-danger is-small"
                        onClick={handleMovementDelete}
                      >
                        Remove Movement <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                    <SetEditItem
                      set={set}
                      editedWorkout={editedWorkout}
                      handleValueChange={handleValueChange}
                      handleSetDelete={handleSetDelete}
                    />
                  </>
                );
              }
            }
            return (
              <SetEditItem
                set={set}
                editedWorkout={editedWorkout}
                handleValueChange={handleValueChange}
                handleSetDelete={handleSetDelete}
              />
            );
          })}
      </ul>
    </>
  );
};

const inputWidth = {
  width: '100px',
};

export default EditView;
