import { IMovementSection } from '../pages/NewWorkout';

import NewMovementSection from './NewMovementSection';

interface Props {
  movementSections: IMovementSection[];
  handleMovementSectionDelete: (removeItemIndex: number) => void;
  setMovementSections: React.Dispatch<React.SetStateAction<IMovementSection[]>>;
}

const NewWorkoutCard = ({
  movementSections,
  handleMovementSectionDelete,
  setMovementSections,
}: Props) => {
  return (
    <div className="card mt-5">
      <h4 className="title is-4 ml-3 mt-3">Name 10-2-2021</h4>
      {movementSections &&
        movementSections.map((item: IMovementSection, index: number) => {
          return (
            <NewMovementSection
              key={index}
              itemIndex={index}
              movementItem={item}
              handleRemove={handleMovementSectionDelete}
            />
          );
        })}
      <div className="mb-3 ml-3 is-flex-direction-column">
        <p className="mb-1">Add Movement</p>
        <button
          className="button is-primary is-small"
          onClick={() => {
            const updatedMovements = [...movementSections, Object.create(null)];
            setMovementSections(updatedMovements);
          }}
        >
          <i className="fas fa-2x fa-plus-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default NewWorkoutCard;
