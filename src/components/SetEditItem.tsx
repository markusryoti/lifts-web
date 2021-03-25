import axios from 'axios';
import { ISet, IWorkout, IWorkoutMovements } from '../pages/WorkoutList';

interface Props {
  key: string;
  id: string;
  set: ISet;
  editedWorkout: IWorkout;
  setEditedWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout | null>>;
}

const SetEditItem = ({
  set,
  editedWorkout,
  setEditedWorkout,
  setWorkout,
}: Props) => {
  const handleSetDelete = () => {
    const setId = set.set_id;

    // Update UI first
    const updatedWorkoutMovements: IWorkoutMovements = JSON.parse(
      JSON.stringify(editedWorkout.movements)
    );

    const newSets: Array<ISet> = updatedWorkoutMovements[
      set.movement_name
    ].filter((set: ISet) => {
      const setCopy = { ...set };
      if (setCopy.set_id === setId) {
        return false;
      }
      return true;
    });

    updatedWorkoutMovements[set.movement_name] = newSets;

    setEditedWorkout({
      ...editedWorkout,
      movements: updatedWorkoutMovements,
    });

    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${editedWorkout.workout_id}/sets/set/${setId}`
      )
      .then(res => {
        if (res.status === 200) {
          // Update for the non edit view as well
          axios
            .get(
              `${process.env.REACT_APP_API_BASE_URL}/workouts/${editedWorkout.workout_id}`
            )
            .then(res => {
              if (setWorkout) {
                setWorkout({ ...res.data });
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.error(err));
  };

  const updateSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setId = parseInt(set.set_id);
    const valueType = e.currentTarget.name;
    const value = parseInt(e.currentTarget.value);

    const updatedWorkout: IWorkout = { ...editedWorkout };

    Object.keys(editedWorkout?.movements).forEach((movement: string) => {
      const newMovementSets = editedWorkout?.movements[movement].map(
        (set: ISet) => {
          const setCopy = { ...set };
          if (parseInt(set.set_id) === setId) {
            return {
              ...setCopy,
              [valueType]: value,
            };
          }
          return setCopy;
        }
      );
      updatedWorkout.movements[movement] = newMovementSets;
    });

    setEditedWorkout(updatedWorkout);
  };

  return (
    <li
      key={set.set_id}
      id={set.set_id}
      className="is-flex is-align-items-center"
    >
      <input
        type="number"
        min="0"
        className="input mr-1 mt-2"
        name="reps"
        placeholder={set.reps.toString()}
        style={inputWidth}
        onChange={updateSetValue}
      />{' '}
      x{' '}
      <input
        type="number"
        min="0"
        className="input ml-1 mr-1 mt-2"
        name="weight"
        placeholder={set.weight.toString()}
        style={inputWidth}
        onChange={updateSetValue}
      />{' '}
      kg{' '}
      <button
        className="button is-danger is-small ml-3 mt-2"
        onClick={handleSetDelete}
      >
        <i className="fas fa-times"></i>
      </button>
    </li>
  );
};

const inputWidth = {
  width: '100px',
};

export default SetEditItem;
