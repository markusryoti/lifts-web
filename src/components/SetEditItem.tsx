import axios from 'axios';
import { setuid } from 'process';
import { ISet, IWorkout } from '../pages/WorkoutList';

interface Props {
  key: string;
  id: string;
  set: ISet;
  setIndex: number;
  editedWorkout: IWorkout;
  setEditedWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout | null>>;
}

const SetEditItem = ({
  set,
  setIndex,
  editedWorkout,
  setEditedWorkout,
  setWorkout,
}: Props) => {
  const handleSetDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const res = confirm('Are you sure? Cannot be reverted');
    if (!res) return;

    const setId = set.set_id;

    // Update UI first
    const updatedWorkoutSets: Array<ISet> = editedWorkout.sets.filter(
      (set: ISet) => {
        const setCopy = { ...set };
        if (setCopy.set_id === setId) {
          return false;
        }
        return true;
      }
    );

    setEditedWorkout({
      ...editedWorkout,
      sets: updatedWorkoutSets,
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
    let setId = parseInt(set.set_id);

    if (isNaN(setId)) {
      if (e.currentTarget.parentElement) {
        setId = parseInt(e.currentTarget.parentElement?.id.replace('new-', '')); // array index
      } else {
        return;
      }
    }

    const valueType = e.currentTarget.name;
    const value = parseInt(e.currentTarget.value);

    const updatedWorkout: IWorkout = { ...editedWorkout };

    const newMovementSets = editedWorkout?.sets.map(
      (s: ISet, index: number) => {
        const setCopy = { ...s };

        if (!setCopy.set_id && setCopy.movement_name === set.movement_name) {
          return {
            ...setCopy,
            [valueType]: value,
          };
        }

        if (parseInt(setCopy.set_id) === setId) {
          return {
            ...setCopy,
            [valueType]: value,
          };
        }

        return setCopy;
      }
    );

    updatedWorkout.sets = newMovementSets;

    setEditedWorkout(updatedWorkout);
  };

  return (
    <li
      key={set.set_id}
      id={set.set_id ? set.set_id : 'new-' + setIndex.toString()}
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
