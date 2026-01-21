import { useDispatch, useSelector } from 'react-redux';
import { City, Offer } from '../../types';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Header from '../../components/header/header';
import { changeCity, changeSortType, setActiveOfferId } from '../../store/action';
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
  const sortType = useSelector((state: RootState) => state.sortType);
  const activeOfferId = useSelector((state: RootState) => state.activeOfferId);
  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
  const sortedOffers = (() => {
    switch (sortType) {
      case 'Price: low to high':
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      case 'Popular':
      default:
        return filteredOffers;
    }
  })();
  const placesCount = sortedOffers.length;
  const isDev = import.meta.env.DEV;
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const isOffersLoadError = useSelector((state: RootState) => state.isOffersLoadError);

  const handleCityChange = (city: City) => {
    dispatch(changeCity(city));
  };

  const handleSortTypeChange = (nextSortType: Parameters<typeof changeSortType>[0]) => {
    dispatch(changeSortType(nextSortType));
  };

  const handleOfferHover = (offer: Offer | undefined) => {
    dispatch(setActiveOfferId(offer?.id ?? null));
  };

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
