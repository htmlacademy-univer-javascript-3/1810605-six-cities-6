import { City } from '../../types';

interface CitiesListProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
}

function CitiesList({ cities, selectedCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        const isActive = city.name === selectedCity.name;
        return (
          <li key={city.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onCityChange(city);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
