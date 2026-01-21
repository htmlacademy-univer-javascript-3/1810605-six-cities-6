import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { City, Offer } from '../../types';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { changeCity } from '../../store/action';
import { RootState } from '../../store';

const cities: City[] = [
  {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499 }
  },
  {
    name: 'Cologne',
    location: { latitude: 50.938361, longitude: 6.959974 }
  },
  {
    name: 'Brussels',
    location: { latitude: 50.846557, longitude: 4.351697 }
  },
  {
    name: 'Amsterdam',
    location: { latitude: 52.37454, longitude: 4.897976 }
  },
  {
    name: 'Hamburg',
    location: { latitude: 53.550341, longitude: 10.000654 }
  },
  {
    name: 'Dusseldorf',
    location: { latitude: 51.225402, longitude: 6.776314 }
  }
];

function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
  const placesCount = filteredOffers.length;
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleSortingToggle = () => {
    setIsSortingOpen(!isSortingOpen);
  };

  const handleSortingOptionClick = () => {
    setIsSortingOpen(false);
  };

  const handleCityChange = (city: City) => {
    dispatch(changeCity(city));
    setSelectedOffer(undefined);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {selectedCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  onClick={handleSortingToggle}
                >
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}>
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                    onClick={handleSortingOptionClick}
                  >
                    Popular
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                    onClick={handleSortingOptionClick}
                  >
                    Price: low to high
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                    onClick={handleSortingOptionClick}
                  >
                    Price: high to low
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                    onClick={handleSortingOptionClick}
                  >
                    Top rated first
                  </li>
                </ul>
              </form>
              <OfferList offers={filteredOffers} onOfferHover={setSelectedOffer} />
            </section>
            <div className="cities__right-section">
              <Map
                city={selectedCity}
                points={filteredOffers}
                selectedPointId={selectedOffer?.id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
