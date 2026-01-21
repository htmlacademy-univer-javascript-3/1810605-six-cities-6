import { useState } from 'react';
import { SortType } from '../../store/action';

interface SortingOptionsProps {
  sortType: SortType;
  onSortTypeChange: (sortType: SortType) => void;
}

const sortingOptions: SortType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

function SortingOptions({ sortType, onSortTypeChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortingOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${option === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              onSortTypeChange(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
