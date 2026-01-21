import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { City, Offer } from '../../types';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Header from '../../components/header/header';
import { changeCity, changeSortType, setActiveOfferId } from '../../store/slices/offers-slice';
import {
  selectActiveOfferId,
  selectCity,
  selectIsOffersLoadError,
  selectIsOffersLoading,
  selectOffers,
  selectSortType,
  selectSortedOffers
} from '../../store/selectors';

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
  const selectedCity = useSelector(selectCity);
  const offers = useSelector(selectOffers);
  const sortType = useSelector(selectSortType);
  const activeOfferId = useSelector(selectActiveOfferId);
  const sortedOffers = useSelector(selectSortedOffers);
  const placesCount = sortedOffers.length;
  const isDev = import.meta.env.DEV;
  const isOffersLoading = useSelector(selectIsOffersLoading);
  const isOffersLoadError = useSelector(selectIsOffersLoadError);

  const handleCityChange = useCallback((city: City) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const handleSortTypeChange = useCallback((nextSortType: Parameters<typeof changeSortType>[0]) => {
    dispatch(changeSortType(nextSortType));
  }, [dispatch]);

  const handleOfferHover = useCallback((offer: Offer | undefined) => {
    dispatch(setActiveOfferId(offer?.id ?? null));
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header isLogoActive />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        {isDev && (
          <div className="container" style={{ paddingTop: '10px' }}>
            <small>
              isOffersLoading: {String(isOffersLoading)} | isOffersLoadError: {String(isOffersLoadError)} | offers: {offers.length}
            </small>
          </div>
        )}
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
              <SortingOptions sortType={sortType} onSortTypeChange={handleSortTypeChange} />
              <OfferList offers={sortedOffers} onOfferHover={handleOfferHover} />
            </section>
            <div className="cities__right-section">
              <Map
                city={selectedCity}
                points={sortedOffers}
                selectedPointId={activeOfferId ?? undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
