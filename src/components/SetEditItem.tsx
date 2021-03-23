import { ISet, IWorkout } from '../pages/WorkoutList';

interface Props {
  key: string;
  id: string;
  set: ISet;
  editedWorkout: IWorkout;
  setEditedWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
}

const SetEditItem = ({ set, editedWorkout, setEditedWorkout }: Props) => {
  const updateSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setId = set.set_id;
    const valueType = e.currentTarget.name;
    const value = parseInt(e.currentTarget.value);

    const updatedWorkout: IWorkout = { ...editedWorkout };
    Object.keys(editedWorkout?.movements).forEach((movement: string) => {
      const newMovementSets = editedWorkout?.movements[movement].map(
        (set: ISet) => {
          if (set.set_id === setId) {
            return {
              ...set,
              [valueType]: value,
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
    <li key={set.set_id} id={set.set_id} onChange={() => {}}>
      <input
        type="number"
        min="0"
        className="input"
        name="reps"
        placeholder={set.reps.toString()}
        style={inputWidth}
        onChange={updateSetValue}
      />{' '}
      x{' '}
      <input
        type="number"
        min="0"
        className="input"
        name="weight"
        placeholder={set.weight.toString()}
        style={inputWidth}
        onChange={updateSetValue}
      />{' '}
      kg{' '}
      <button className="button is-danger is-small" onClick={() => {}}>
        <i className="fas fa-times"></i>
      </button>
    </li>
  );
};

const inputWidth = {
  width: '100px',
};

export default SetEditItem;
